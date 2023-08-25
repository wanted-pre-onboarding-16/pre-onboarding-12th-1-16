import { api } from './Api';

export const SignInHandle = async (email: string, password: string) => {
  const result = await api.post('/auth/signin', { email, password });
  return result;
};

export const SignUpHandle = async (email: string, password: string) => {
  const result = await api.post('/auth/signup', { email, password });
  return result;
};
