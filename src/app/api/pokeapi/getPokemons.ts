import axios from 'axios';

export const getPokemons = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon');
};
