import type { AxiosError } from "axios";
import { userDebtApi } from "../../api/userDebtsApi";
import type { User } from "@/interfaces/user.interface";

export const getUsersAction = async (): Promise<User[]> => {
  try {
    const { data } = await userDebtApi.get<User[]>("/auth");

    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    throw new Error(error.response?.data?.error || error.message);
  }
};
