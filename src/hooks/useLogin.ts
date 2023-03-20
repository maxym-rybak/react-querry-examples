import { useQuery } from 'react-query';
import { login } from '../app/api/firebase/login';

const POOL_TIME = 1000 * 60;

export const useLogin = (username: string) => {
  return useQuery({
    queryKey: ['login', username],
    queryFn: () => login({ name: username }),
    enabled: username.length > 0,
    staleTime: POOL_TIME,
    cacheTime: POOL_TIME,
  });
};
