import { userDebtApi } from '../../api/userDebtsApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const registerAction = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await userDebtApi.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
