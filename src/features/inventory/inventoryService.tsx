import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IGetInventoryResponse } from "@/types/ApiResponse/IGetInventoryResponse";
import axios from "axios";
import { PartRegistrationFormData } from "./createPartModal";
import { getAuthConfig } from "@/config/authConfig";

export const getInventory = async (): Promise<IGetInventoryResponse> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.inventory.getInventory(),
       getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const deletePart = async (id: string) => {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.inventory.deletePart(id),
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const addPart = async (
  data: PartRegistrationFormData
): Promise<string> => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.inventory.addPart(),
      data,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao registrar peça:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro inesperado:", error);
    }
    throw error;
  }
};

export const updatePartQuantity = async (
  id: string,
  quantity: number
): Promise<string> => {
  try {
    const response = await axios.put(
      API_ENDPOINTS.inventory.updatePartQuantity(id),
      { quantity },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
