import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IGetAllUsersResponse } from "@/types/ApiResponse/IGetAllUsersResponse";
import { ILoginResponse } from "@/types/ApiResponse/ILoginResponse";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

const token = localStorage.getItem("authToken");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

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
      config
    );
    return response.data.filter(
      (user: IGetAllUsersResponse) => user.role === "mechanic"
    );
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
