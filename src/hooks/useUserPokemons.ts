import { useQuery } from 'react-query';
import { getUserPokemons } from '../app/api/firebase/managePokemons';

const POOL_TIME = 1000 * 60 * 60;

export const useUserPokemons = (username: string) => {
  return useQuery({
    queryKey: ['userPokemons', username],
    queryFn: () => getUserPokemons(username),
    enabled: !!username.length,
    cacheTime: POOL_TIME,
    staleTime: POOL_TIME,
  });
};
