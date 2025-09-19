import type { AxiosError } from "axios";
import { userDebtApi } from "../../api/userDebtsApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse | null> => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const { data } = await userDebtApi.get<AuthResponse>("/auth/check-status");

    localStorage.setItem("token", data.token);

    return data;
  } catch (err) {
    localStorage.removeItem("token");
    const error = err as AxiosError<{ error: string }>;
    throw new Error(error.response?.data?.error || error.message);
  }
};
