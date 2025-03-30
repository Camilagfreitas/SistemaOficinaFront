export interface IGetAllVehiclesResponse {
  _id: string;
    plate: string;
    owner: {
      name: string;
      lastname:string;
    }; 
    mileage: number;
    year: number;
    brand: string;
    model: string;
    chassis: string;
    color: string;
    fuel: string;
    inspection?: string;
    notes?: string;
  }
  