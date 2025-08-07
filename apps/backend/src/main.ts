import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/api', (req, res) => {
  res
    .status(200)
    .send({ message: 'Hejsan, detta meddelandet kommer ifrån backend :)' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
