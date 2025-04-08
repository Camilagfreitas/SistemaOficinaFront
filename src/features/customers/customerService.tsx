import { API_ENDPOINTS } from "@/config/apiDictionary";
import { IGetAllCustomersResponse } from "@/types/ApiResponse/IGetAllCustomersResponse";
import axios from "axios";
import { CustomerRegistrationFormData } from "./customerRegistrationScreen";
import { IGetCustomerDetailsResponse } from "@/types/ApiResponse/IGetCustomerDetailsResponse";

const token = localStorage.getItem('authToken');

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

  export const getAllCustomers= async (): Promise<IGetAllCustomersResponse[]> => {
    try {
      const response = await axios.get(API_ENDPOINTS.customer.getAllCustomers(), config);
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }

  export const postRegisterCustomer = async (
    data: CustomerRegistrationFormData
  ): Promise<IGetAllCustomersResponse> => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.customer.postRegisterCustomer(),
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao registrar cliente:', error.response?.data || error.message);
      } else {
        console.error('Erro inesperado:', error);
      }
      throw error;
    }
  }  

  export const getCustomerDetails = async (customerId: string): Promise<IGetCustomerDetailsResponse> => {
    try {
      const response = await axios.get(API_ENDPOINTS.customer.getCustomerDetails(customerId), config);
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
      throw error;
    }
  }


