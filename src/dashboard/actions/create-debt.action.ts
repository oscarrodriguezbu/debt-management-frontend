import type { DebtsResponse } from '@/interfaces/debs.reponse';
import { userDebtApi } from '../../api/userDebtsApi';

export const createDebAction = async (
  amount: number,
  creditorId: number,
  description: string,
): Promise<DebtsResponse> => {
  try {
    const { data } = await userDebtApi.post<DebtsResponse>('/debts', {
      amount,
      creditorId,
      description,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
