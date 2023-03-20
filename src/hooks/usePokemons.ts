import { useQuery } from 'react-query';
import { getPokemons } from '../app/api/pokeapi/getPokemons';

const POOL_TIME = 1000 * 60 * 60;

export const usePokemons = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['pokemons', `limit=${limit}&offset=${offset}`],
    queryFn: () => getPokemons(limit, offset),
    cacheTime: POOL_TIME,
    staleTime: POOL_TIME,
  });
};
