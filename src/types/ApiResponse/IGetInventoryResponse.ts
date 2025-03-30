export interface IPart {
    _id: string;
    code: string;
    description: string;
    price: number;
    vehiclesModels: string[];
}

export interface IGetInventoryItem {
    _id: string;
    part: IPart;
    quantity: number;
}

export interface IGetInventoryResponse {
    parts: IGetInventoryItem[]
}