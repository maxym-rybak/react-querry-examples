import axios from 'axios';
import { Pokemon } from '../entities';

interface GetPokemonsResponse {
  data: {
    results: {
      name: string;
      url: string;
    }[];
  };
}

export const getPokemons = (): Promise<GetPokemonsResponse> => {
  return axios.get('https://pokeapi.co/api/v2/pokemon');
};

export const getPokemonDetailedInfoFromUrl = async (url: string): Promise<Pokemon> => {
  const res = await axios.get(url);
  return res.data;
};
