import { useMutation } from '@tanstack/react-query';
import { addHeaders } from './addHeaders';
import type { SupportedLanguages } from '@chatt/types';

type Props = {
  text: string;
  target: SupportedLanguages;
  source: SupportedLanguages;
};

export const usePostTranslateTextMutate = () =>
  useMutation({
    mutationKey: ['translate'],
    mutationFn: async ({
      text,
      source,
      target,
    }: Props): Promise<{ message: string }> => {
      const headers = await addHeaders();
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          text,
          source,
          target,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed');
      }
      return response.json();
    },
  });
