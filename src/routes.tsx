import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthenticatedLayout from "./components/ui/AuthenticatedLayout";
import CustomerListScreen from "./features/customers/customerListScreen";
import CustomerRegistrationScreen from "./features/customers/customerRegistrationScreen";
import HomeScreen from "./features/home/homeScreen";
import InventoryListScreen from "./features/inventory/inventoryListScreen";
import ServiceDetailsScreen from "./features/serviceOrders/serviceOrderDetailsScreen";
import ServiceOrderListScreen from "./features/serviceOrders/serviceOrderListScreen";
import ServiceRegistrationScreen from "./features/serviceOrders/serviceOrderRegistrationScreen";
import LoginScreen from "./features/users/loginScreen";
import UserListScreen from "./features/users/userListScreen";
import UserRegistrationScreen from "./features/users/userRegistrationScreen";
import VehicleListScreen from "./features/vehicles/vehicleListScreen";
import VehicleRegistrationScreen from "./features/vehicles/vehicleRegistrationScreen";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/cadastroUsuario" element={<UserRegistrationScreen />} />
          <Route path="/listaUsuarios" element={<UserListScreen />} />

          <Route path="/listaClientes" element={<CustomerListScreen />} />
          <Route
            path="/cadastroCliente"
            element={<CustomerRegistrationScreen />}
          />
          <Route path="/listaVeiculos" element={<VehicleListScreen />} />
          <Route
            path="/cadastroVeiculo"
            element={<VehicleRegistrationScreen />}
          />
          <Route path="/listaEstoque" element={<InventoryListScreen />} />
          <Route
            path="/cadastroServico"
            element={<ServiceRegistrationScreen />}
          />
          <Route path="/listaServicos" element={<ServiceOrderListScreen />} />
          <Route
            path="/detalhesServico/:id"
            element={<ServiceDetailsScreen />}
          />
          <Route
            path="/editarServico/:id"
            element={<ServiceRegistrationScreen />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
