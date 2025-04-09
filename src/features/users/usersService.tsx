import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IGetAllUsersResponse } from "@/types/ApiResponse/IGetAllUsersResponse";
import { ILoginResponse } from "@/types/ApiResponse/ILoginResponse";
import axios from "axios";
import { UserRegistrationFormData } from "./userRegistrationScreen";
import { getAuthConfig } from "@/config/authConfig";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (body: LoginData): Promise<ILoginResponse> => {
  try {
    const response = await axios.post(API_ENDPOINTS.users.login, body);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
export const getAllMechanics = async (): Promise<IGetAllUsersResponse[]> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.mechanic.getAllMechanics(),
       getAuthConfig()
    );
    return response.data.filter(
      (user: IGetAllUsersResponse) => user.role === "mechanic"
    );
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const registerUser = async (
  body: UserRegistrationFormData
): Promise<ILoginResponse> => {
  try {
    const response = await axios.post(API_ENDPOINTS.users.register(), body);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
