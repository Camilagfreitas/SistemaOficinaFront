// Interface para o Cliente (Customer)
export interface Customer {
    _id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    document: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Interface para o Veículo (Vehicle)
  export interface Vehicle {
    _id: string;
    plate: string;
    customer: string; // Ref para Customer
    mileage: number;
    year: number;
    brand: string;
    model: string;
    chassis: string;
    color: string;
    fuel: string;
    inspection: string;
    notes: string;
    createdAt: string;
    updatedAt: string
  }
  
  // Interface para o Serviço Detalhado (ServiceDetails)
  export interface ServiceDetails {
    quantity: number;
    price: number;
    part: Part;  // Ref para Part
  }
  
  // Interface para o Serviço (Service)
  export interface Service {
    category: DefectCategory;  // Ref para DefectCategory
    details: ServiceDetails[];
  }
  
  // Interface para a Peça (Part)
  export interface Part {
    _id: string;
    name: string;
    description: string;
    price: number;
  }
  
  // Interface para a Categoria de Defeito (DefectCategory)
  export interface DefectCategory {
    _id: string;
    name: string;
    description: string;
  }
  
  // Interface para a Ordem de Serviço (ServiceOrder)
  export interface ServiceOrder {
    _id: string;
    vehicle: Vehicle;  // Ref para Vehicle
    user: User;        // Ref para User
    status: "OPENED" | "IN_PROGRESS" | "BLOCKED" | "CLOSED";
    services: Service[];  // Array de Service
    totalPrice: number;
    deletedAt?: Date;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  export interface IGetCustomerDetailsResponse {
    customer: Customer;
    vehicles: Vehicle[];
    services: ServiceOrder[];
  }
  