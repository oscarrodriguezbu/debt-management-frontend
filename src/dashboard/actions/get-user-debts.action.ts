import { userDebtApi } from "@/api/userDebtsApi";
import type { DebtsResponse } from "@/interfaces/debs.reponse";
import type { AxiosError } from "axios";

interface Options {
  isPaid?: string;
}

export const getUserDebtsAction = async (
  options: Options
): Promise<DebtsResponse[]> => {
  try {
    const { isPaid } = options;
    const { data } = await userDebtApi.get<DebtsResponse[]>(
      "/debts/userDebts",
      {
        params: {
          isPaid,
        },
      }
    );

    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    throw new Error(error.response?.data?.error || error.message);
  }
};
//todo ajustar mensajes de error para obtener usuarios y para la consulta de las deudas