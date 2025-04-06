export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  users: {
    login: `${API_BASE_URL}/users/login`,
    register: () => `${API_BASE_URL}/users/register`,
    getAllUsers: () => `${API_BASE_URL}/users/getAll`,
  },
  customer: {
    getUser: (id: string) => `${API_BASE_URL}/users/${id}`,
    getAllCustomers: () => `${API_BASE_URL}/customers/getAll`,
    postRegisterCustomer: () => `${API_BASE_URL}/customers/register`,
  },
  mechanic: {
    getAllMechanics: () => `${API_BASE_URL}/users/getAll`,
    postRegisterMechanic: () => `${API_BASE_URL}/users/register`,
  },
  vehicle: {
    getAllVehicles: () => `${API_BASE_URL}/vehicles/getAll`,
    postRegisterVehicle: () => `${API_BASE_URL}/vehicles/register`,
    getAllBrands: () =>
      `https://api.invertexto.com/v1/fipe/brands/1?token=18543|IWHyefYIJIyMqkicyonIK6zWJwtJh2eH`,
    getAllModels: () => `https://api.invertexto.com/v1/fipe/models/`,
  },
  inventory: {
    getInventory: () =>
      `${API_BASE_URL}/inventory/getById/67cc8d8ddcee324bf91140ca`,
    deletePart: (id: string) =>
      `${API_BASE_URL}/inventory/67cc8d8ddcee324bf91140ca/deletePart/${id}`,
    addPart: () => `${API_BASE_URL}/inventory/67cc8d8ddcee324bf91140ca/addPart`,
    updatePartsBatch: () =>
      `${API_BASE_URL}/inventory/67cc8d8ddcee324bf91140ca/updatePartsBatch`,
  },
  service: {
    getDefectCategories: () => `${API_BASE_URL}/defectCategories/getAll`,
    postRegisterDefectCategory: () =>
      `${API_BASE_URL}/defectCategories/register`,
    createServiceOrder: () => `${API_BASE_URL}/serviceOrder/register`,
    getServiceOrderList: () => `${API_BASE_URL}/serviceOrder/getAll`,
    getServiceOrderById: (id: string) =>
      `${API_BASE_URL}/serviceOrder/getById/${id}`,
    updateServiceOrder: (id: string) =>
      `${API_BASE_URL}/serviceOrder/update/${id}`,
  },
};
