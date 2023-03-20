import { getDatabase, ref, set } from '@firebase/database';
import firebaseApp from 'firebase';
import { User } from '../entities';

export const createUser = (user: User) => {
  const db = getDatabase(firebaseApp);
  const reference = ref(db, 'users/' + user.name);

  return set(reference, { name: user.name });
};
