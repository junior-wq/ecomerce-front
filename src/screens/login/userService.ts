import { AxiosError } from "axios";
import apiClient from "../../services/api-client";
import { UserType } from "../../state-management/cart-store/context/auth-context";

export const getCurrentUser = async (): Promise<UserType | null> => {
  try {
    const resp = await apiClient.get<UserType>("/auth/users/me/");
    return resp.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error("Erro ao pegar usuário:", error.message);
    return null; // garante que sempre há um retorno
  }
};
