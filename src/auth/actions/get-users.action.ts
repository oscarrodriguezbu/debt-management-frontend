import { userDebtApi } from '../../api/userDebtsApi';
import type { User } from '@/interfaces/user.interface';

export const getUsersAction = async (): Promise<User[]> => {
  try {
    const { data } = await userDebtApi.get<User[]>('/auth');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
