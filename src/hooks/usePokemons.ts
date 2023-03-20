import { useQuery } from 'react-query';
import { getPokemons } from '../app/api/pokeapi/getPokemons';

export const usePokemons = () => {
  return useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
  });
};
