import { userDebtApi } from '@/api/userDebtsApi';
import type { DebtsResponse } from '@/interfaces/debs.reponse';

interface Options {
    isPaid?: string;
}

export const getUserDebtsAction = async (
    options: Options
): Promise<DebtsResponse[]> => {
    const { isPaid } = options;
    const { data } = await userDebtApi.get<DebtsResponse[]>('/debts/userDebts', {
        params: {
            isPaid,
        },
    });

    return data;
};
