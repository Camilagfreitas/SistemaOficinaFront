import { IGetAllUsersResponse } from "./IGetAllUsersResponse";
import { IGetAllVehiclesResponse } from "./IGetAllVehiclesResponse";
import { IGetDefectCategories } from "./IGetDefectCategoriesResponse";

export interface IServiceDetails {
  quantity: number;
  price: number;
  part: string;
}

export interface IService {
  category: IGetDefectCategories;
  details: IServiceDetails[];
}

export interface IServiceOrder {
  _id: string;
  vehicle: IGetAllVehiclesResponse;
  user: IGetAllUsersResponse;
  status: string;
  services: IService[];
  totalPrice: number;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
