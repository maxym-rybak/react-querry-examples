import { getDatabase, ref, set } from '@firebase/database';
import firebaseApp from '../../services/firebase';
import { Pokemon, User } from './entities';

export const addPokemon = (user: User, pokemon: Pokemon) => {
  const db = getDatabase(firebaseApp);
  const reference = ref(db, 'pokemons/' + user.name + pokemon.name);

  return set(reference, { name: user.name });
};
