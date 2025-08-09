import { useQuery } from '@tanstack/react-query';

export const useGetMessageFromBE = () =>
  useQuery({
    queryKey: ['message'],
    queryFn: async (): Promise<{ message: string }> => {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Failed');
      }
      return response.json();
    },
    select: (data) => data.message,
  });
