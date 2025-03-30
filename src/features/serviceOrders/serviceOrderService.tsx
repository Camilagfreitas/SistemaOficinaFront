import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IGetDefectCategories } from "@/types/ApiResponse/IGetDefectCategoriesResponse";
import axios from "axios";
import { DefectRegistrationFormData } from "./createDefectModal";

const token = localStorage.getItem("authToken");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getDefectCategories = async (): Promise<
  IGetDefectCategories[]
> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.service.getDefectCategories(),
      config
    );
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const postRegisterDefectCategory = async (
  data: DefectRegistrationFormData
): Promise<IGetDefectCategories> => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.service.postRegisterDefectCategory(),
      data,
      config
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao registrar serviço:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro inesperado:", error);
    }
    throw error;
  }
};
