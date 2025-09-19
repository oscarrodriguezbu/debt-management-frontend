import { create } from "zustand";

import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import type { User } from "../../interfaces/user.interface";
import { registerAction } from "../actions/register.action";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  checkAuthStatus: () => Promise<boolean>;
};

const handleAuthError = (err: unknown, set: any) => {
  const error = err as AxiosError<{ error: string }>;
  toast.error(error.message);
  localStorage.removeItem("token");
  set(notAuthenticated);
  return false;
};

const notAuthenticated: Partial<AuthState> = {
  user: null,
  token: null,
  authStatus: "not-authenticated",
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  authStatus: "checking",

  login: async (email, password) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "authenticated" });

      return true;
    } catch (err) {
      return handleAuthError(err, set);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set(notAuthenticated);
  },

  register: async (name, email, password) => {
    try {
      const data = await registerAction(name, email, password);
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "authenticated" });

      return true;
    } catch (err) {
      return handleAuthError(err, set);
    }
  },

  checkAuthStatus: async () => {
    try {
      const result = await checkAuthAction();
      if (!result) {
        set(notAuthenticated);
        return false;
      }

      const { user, token } = result;

      set({
        user: user,
        token: token,
        authStatus: "authenticated",
      });
      return true;
    } catch (err) {
      return handleAuthError(err, set);
    }
  },
}));
