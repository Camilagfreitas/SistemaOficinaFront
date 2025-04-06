import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IServiceOrder } from "@/types/ApiResponse/IGetAllServiceOrdersResponse";
import { IGetDefectCategories } from "@/types/ApiResponse/IGetDefectCategoriesResponse";
import { IServiceOrderDetails } from "@/types/ApiResponse/IGetServiceOrderDetailsResponse";
import axios from "axios";
import { DefectRegistrationFormData } from "./createDefectModal";
import { ServiceFormData } from "./serviceOrderRegistrationScreen";
import { translateStatus } from "./serviceOrderUtils";

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

export const updatePartsBatch = async (data: ServiceFormData) => {
  const body = {
    services: data.services.map((service) => ({
      inventoryId: "67cc8d8ddcee324bf91140ca",
      parts: service.parts.map((part) => ({
        code: part.id,
        quantity: part.quantity,
      })),
    })),
  };
  try {
    const response = await axios.put(
      API_ENDPOINTS.inventory.updatePartsBatch(),
      body,
      config
    );
    return response;
  } catch (error) {
    console.error("Erro ao registrar serviço ou atualizar inventário:", error);
  }
};

export const registerServiceOrder = async (
  data: ServiceFormData & { status: string }
) => {
  try {
    const body = {
      vehicle: data.vehicle,
      user: data.mechanic,
      status: data.status,
      totalPrice: data.totalPrice,
      services: data.services.map((service) => ({
        category: service.serviceType,
        details: service.parts.map((part) => ({
          part: part.id,
          quantity: part.quantity,
          price: part.price,
        })),
      })),
    };

    const response = await axios.post(
      API_ENDPOINTS.service.createServiceOrder(),
      body,
      config
    );

    return response;
  } catch (error) {
    console.error("Erro ao registrar serviço ou atualizar inventário:", error);
  }
};

export const getServiceOrderList = async (): Promise<IServiceOrder[]> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.service.getServiceOrderList(),
      config
    );

    const translatedData = response.data.map((order: IServiceOrder) => ({
      ...order,
      status: translateStatus(order.status),
    }));

    return translatedData;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const getServiceOrderById = async (
  id: string
): Promise<IServiceOrderDetails> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.service.getServiceOrderById(id),
      config
    );

    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

export const updateServiceOrder = async (
  data: ServiceFormData & { status: string },
  id: string
) => {
  try {
    const body = {
      vehicle: data.vehicle,
      user: data.mechanic,
      status: data.status,
      totalPrice: data.totalPrice,
      services: data.services.map((service) => ({
        category: service.serviceType,
        details: service.parts.map((part) => ({
          part: part.id,
          quantity: part.quantity,
          price: part.price,
        })),
      })),
    };

    const response = await axios.post(
      API_ENDPOINTS.service.updateServiceOrder(id),
      body,
      config
    );

    return response;
  } catch (error) {
    console.error("Erro ao registrar serviço ou atualizar inventário:", error);
  }
};
