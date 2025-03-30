import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IGetAllBrands } from "@/types/ApiResponse/IGetAllBrands";
import { IGetAllVehiclesResponse } from "@/types/ApiResponse/IGetAllVehiclesResponse";
import axios from "axios";
import { VehicleRegistrationFormData } from "./vehicleRegistrationScreen";

const token = localStorage.getItem('authToken');

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

  export const getAllVehicles = async (): Promise<IGetAllVehiclesResponse[]> => {
    try {
      const response = await axios.get(API_ENDPOINTS.vehicle.getAllVehicles(), config);
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  export const getAllBrands = async (): Promise<IGetAllBrands[]> => {
    try {
      const response = await axios.get(API_ENDPOINTS.vehicle.getAllBrands());
      return response.data.map((brand: { id: number; brand: string }) => ({
        value: brand.brand.toLowerCase().replace(/\s+/g, "-"),
        label: brand.brand,
        id: brand.id
      }));
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  export async function getModelsByBrand(brandId: number): Promise<{ label: string; value: string; id: number; }[]> {
    try {
      const response = await axios.get(`${API_ENDPOINTS.vehicle.getAllModels()}${brandId}`, {
        params: { token: '18543|IWHyefYIJIyMqkicyonIK6zWJwtJh2eH' },
      });
  
      return response.data.map((model: { id: number; model: string }) => ({
        value: model.id.toString(),
        label: model.model,
        id: model.id
      }));
    } catch (error) {
      console.error(`Erro ao buscar modelos para a marca ${brandId}:`, error);
      return [];
    }
  }

  export const postRegisterVehicle = async (
      data: VehicleRegistrationFormData
    ): Promise<IGetAllVehiclesResponse> => {
      try {
        const response = await axios.post(
          API_ENDPOINTS.vehicle.postRegisterVehicle(),
          data,
          config
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Erro ao registrar carro:', error.response?.data || error.message);
        } else {
          console.error('Erro inesperado:', error);
        }
        throw error;
      }
    }  

