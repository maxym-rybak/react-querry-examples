import { getDatabase, ref, get } from '@firebase/database';
import { User } from '../entities';
import firebaseApp from '../../../services/firebaseApp';

export const login = async (user: User) => {
  const db = getDatabase(firebaseApp);
  const reference = ref(db, 'users/' + user.name);

  const snapshot = await get(reference);
  const value: User = snapshot.val();
  if (value) {
    return value;
  } else {
    throw Error('Not found');
  }
};
