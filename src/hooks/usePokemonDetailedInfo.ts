import { useQuery } from 'react-query';
import { getPokemonDetailedInfoFromUrl } from '../app/api/pokeapi/getPokemons';

const POOL_TIME = 1000 * 60 * 60;

export const usePokemonDetailedInfo = (url: string) => {
  return useQuery({
    queryKey: ['pokemon', url],
    queryFn: () => getPokemonDetailedInfoFromUrl(url),
    enabled: !!url.length,
    cacheTime: POOL_TIME,
    staleTime: POOL_TIME,
  });
};
