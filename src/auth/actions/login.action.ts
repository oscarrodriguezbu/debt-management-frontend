import type { AxiosError } from 'axios';
import { userDebtApi } from '../../api/userDebtsApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await userDebtApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    throw new Error(error.response?.data?.error || error.message);
  }
};
