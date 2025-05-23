import { HttpProxy } from './HttpProxy';

const proxy = new HttpProxy('http://localhost:3000/api/', 'JWT', 'userTokenHere');

export const registerUser = async (username: string, password: string) => {
  return await proxy.post('auth/register', { username, password });
};