import { useQuery } from '@tanstack/react-query';
import type { Api } from '../../interfaces/Api';
import { getDummyData } from '../mutations/useCreateApi';
import { queryClient } from '../../main';

const QUERY_KEY = "apis";

export function useGetApis() {
  const query = useQuery<Api[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return [...getDummyData()];
    },
    staleTime: 1000 * 60 * 5,
  });

  return { ...query }
};

useGetApis.invalidateQueries = () => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY], type: 'all', refetchType: 'active' });
}

