import { useQuery } from 'react-query';
import { getPokemons } from '../app/api/pokeapi/getPokemons';

const POOL_TIME = 1000 * 60 * 60;

export const usePokemons = () => {
  return useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
    cacheTime: POOL_TIME,
    staleTime: POOL_TIME,
  });
};
