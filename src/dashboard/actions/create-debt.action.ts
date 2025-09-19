import type { DebtsResponse } from "@/interfaces/debs.reponse";
import { userDebtApi } from "../../api/userDebtsApi";
import type { Debt } from "@/interfaces/debs.interface";
import type { AxiosError } from "axios";

export const createDebAction = async (debt: Debt): Promise<DebtsResponse> => {
  const {
    amount: amountString,
    creditorId: creditorIdString,
    description,
  } = debt;
  const dataToSend = {
    amount: Number(amountString),
    creditorId: Number(creditorIdString),
    description,
  };

  try {
    const { data } = await userDebtApi.post<DebtsResponse>(
      "/debts",
      dataToSend
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    throw new Error(error.response?.data?.error || error.message);
  }
};
