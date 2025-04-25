import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(API_URL);
  return res.data;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const res = await axios.post<User>(API_URL, user);
  return res.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const res = await axios.put<User>(`${API_URL}/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
