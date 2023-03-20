import { get, getDatabase, ref, set, remove } from '@firebase/database';
import { Pokemon } from '../entities';
import firebaseApp from '../../../services/firebaseApp';

export const addPokemon = (username: string, pokemon: Pokemon) => {
  const db = getDatabase(firebaseApp);
  const reference = ref(db, 'pokemons/' + `${username}/` + pokemon.name);

  return set(reference, pokemon);
};

export const removePokemon = (username: string, pokemon: Pokemon) => {
  const db = getDatabase(firebaseApp);
  const reference = ref(db, 'pokemons/' + `${username}/` + pokemon.name);

  return remove(reference);
};

const pokemonsMapToArray = (pokeMap: Record<string, Pokemon>) => {
  return Object.keys(pokeMap).map(key => pokeMap[key]);
};

export const getUserPokemons = async (username: string): Promise<Pokemon[]> => {
  const db = getDatabase(firebaseApp);
  const reference = ref(db, 'pokemons/' + username);

  const snapshot = await get(reference);
  const value: Record<string, Pokemon> = snapshot.val();

  return pokemonsMapToArray(value);
};
