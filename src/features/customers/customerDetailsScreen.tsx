import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerDetails } from "./customerService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { translateStatus } from "../serviceOrders/serviceOrderUtils";

export default function CustomerDetailScreen() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["customerDetails", id],
    queryFn: () => getCustomerDetails(id??''),
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;
  

  return (
    <div className="px-[80px] py-[40px]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-medium text-neutral-500">Detalhes do Cliente</h2>
        {/* <Button
          variant="outline"
          onClick={() => navigate(`/editarCliente/${data?.customer._id}`)}
          className="rounded-xl"
        >
          Editar Cliente
        </Button> */}
      </div>

      {/* Informações Pessoais */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-red-600 mb-4">Informações Pessoais</h3>
        <p><span className="font-medium">Nome:</span> {data?.customer.name} {data?.customer.lastname}</p>
        <p><span className="font-medium">Telefone:</span> {data?.customer.phone}</p>
        <p><span className="font-medium">E-mail:</span> {data?.customer.email}</p>
        <p><span className="font-medium">Documento:</span> {data?.customer.document}</p>
      </div>

      {/* Veículos */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-red-600 mb-4">Veículos</h3>
        {data?.vehicles.length === 0 ? (
          <p>Este cliente não tem veículos registrados.</p>
        ) : (
          <Table className="bg-white rounded-3xl">
            <TableHeader className="h-[60px] text-neutral-400">
              <TableRow>
                <TableHead className="px-10">Modelo</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Ano</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.vehicles.map((vehicle: any) => (
                <TableRow
                  key={vehicle._id}
                  className="h-[50px] text-neutral-500 cursor-pointer"
                >
                  <TableCell className="px-10">{vehicle.model}</TableCell>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Ordens de Serviço */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-red-600 mb-4">Ordens de Serviço</h3>
        {data?.services.length === 0 ? (
          <p>Este cliente não tem ordens de serviço registradas.</p>
        ) : (
          <Table className="bg-white rounded-3xl">
            <TableHeader className="h-[60px] text-neutral-400">
              <TableRow>
                <TableHead className="px-10">Data</TableHead>
                <TableHead className="px-10">Placa do veículo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.services.map((service) => (
                <TableRow
                  key={service._id}
                  className="h-[50px] text-neutral-500 cursor-pointer"
                  onClick={() => navigate(`/detalhesServico/${service._id}`)}
                >
                  {new Date(service.createdAt || new Date()).toLocaleDateString(
                  "pt-BR"
                )}
                  <TableCell>{service.vehicle.plate}</TableCell>
                  <TableCell>{translateStatus(service.status)}</TableCell>
                  <TableCell>{service.totalPrice.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
