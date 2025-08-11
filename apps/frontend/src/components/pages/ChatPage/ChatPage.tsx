import { FormEvent } from 'react';
import { Grid, Box, TextField, Button, Stack } from '@mui/material';
import { usePostTranslateTextMutate } from '@frontend/api';
import Bar from './Bar';

export default function ChatPage() {
  const { mutate, data, isSuccess, isPending } = usePostTranslateTextMutate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const text = formJson.text;
    console.log(text);
    mutate({ text, target: 'en', source: 'sv' });
  };

  return (
    <Grid container margin={4}>
      <Grid size={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Stack direction="column" spacing={2}>
            <TextField
              id="outlined-multiline-static"
              label="Översätt från svenska till engelska"
              multiline
              rows={4}
              name="text"
              type="text"
              variant="standard"
            />
            <Button type="submit" loading={isPending}>
              Översätt
            </Button>
            {isSuccess && (
              <TextField
                id="outlined-read-only-input"
                label="Översatt text"
                value={data.message}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            )}
          </Stack>
        </Box>
      </Grid>
      <Bar />
    </Grid>
  );
}
