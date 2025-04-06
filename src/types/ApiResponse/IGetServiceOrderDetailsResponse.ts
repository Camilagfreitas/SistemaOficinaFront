import { IGetAllUsersResponse } from "./IGetAllUsersResponse";
import { IGetAllVehiclesResponse } from "./IGetAllVehiclesResponse";
import { IGetDefectCategories } from "./IGetDefectCategoriesResponse";

export interface IPartDetails {
    _id: string;
    code: string;
    description: string;
}

export interface IServiceDetails {
  quantity: number;
  price: number;
  part: IPartDetails;
}

export interface IService {
  category: IGetDefectCategories;
  details: IServiceDetails[];
}

export type ServiceOrderStatus = "OPENED" | "IN_PROGRESS" | "BLOCKED" | "CLOSED";

export interface IServiceOrderDetails {
  _id: string;
  vehicle: IGetAllVehiclesResponse;
  user: IGetAllUsersResponse;
  status: ServiceOrderStatus;
  services: IService[];
  totalPrice: number;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
