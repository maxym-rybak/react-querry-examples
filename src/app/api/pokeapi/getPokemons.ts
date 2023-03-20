import axios from 'axios';
import { Pokemon } from '../entities';

interface GetPokemonsResponse {
  data: {
    count: number;
    results: {
      name: string;
      url: string;
    }[];
  };
}

export const getPokemons = (limit: number, offset: number): Promise<GetPokemonsResponse> => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon` + `?limit=${limit}&offset=${offset}`);
};

export const getPokemonDetailedInfoFromUrl = async (url: string): Promise<Pokemon> => {
  const res = await axios.get(url);
  return res.data;
};
