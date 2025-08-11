import express from 'express';
import { checkAuth } from './checkAuth';
import { translateText } from './translateText';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

app.post('/api/translate', async (req, res) => {
  try {
    const { user, error } = await checkAuth(req.headers.authorization);

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { text, target, source } = req.body;

    const translation = await translateText(text, target, source);
    return res.status(200).send({ message: translation });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error });
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
