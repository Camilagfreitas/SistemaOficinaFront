import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IGetInventoryResponse } from "@/types/ApiResponse/IGetInventoryResponse";
import axios from "axios";
import { PartRegistrationFormData } from "./createPartModal";

const token = localStorage.getItem("authToken");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getInventory = async (): Promise<IGetInventoryResponse> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.inventory.getInventory(),
      config
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
      config
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
      config
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
//   export const postRegisterVehicle = async (
//       data: VehicleRegistrationFormData
//     ): Promise<IGetAllVehiclesResponse> => {
//       try {
//         const response = await axios.post(
//           API_ENDPOINTS.vehicle.postRegisterVehicle(),
//           data,
//           config
//         );
//         return response.data;
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           console.error('Erro ao registrar carro:', error.response?.data || error.message);
//         } else {
//           console.error('Erro inesperado:', error);
//         }
//         throw error;
//       }
//     }
