import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { IServiceOrder } from "@/types/ApiResponse/IGetAllServiceOrdersResponse";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { getServiceOrderList } from "./serviceOrderService";

export default function ServiceOrderListScreen() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["serviceOrderList"],
    async queryFn() {
      return await getServiceOrderList();
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data?.filter(
    (service: IServiceOrder) =>
      service.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.vehicle.customer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2 className="pl-[66px] pt-12 text-neutral-500 text-2xl font-medium">
        Ordens de Serviço
      </h2>

      <div className="px-[80px] py-[20px]">
        <div className="flex gap-[40px] mb-4">
          <Input
            startIcon={<Icons.search />}
            placeholder="Procurar Cliente"
            className="bg-white rounded-xl border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            variant="default"
            className="w-auto shadow-md rounded-xl"
            onClick={() => navigate("/cadastroServico")}
          >
            Cadastrar Serviço
          </Button>
        </div>
        <Table className="bg-white rounded-3xl">
          <TableHeader className="h-[60px] text-neutral-400">
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead>Mecânico</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead />
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((order: IServiceOrder) => (
                <TableRow
                  key={order._id}
                  className="text-neutral-600 cursor-pointer hover:bg-neutral-100 transition"
                >
                  <TableCell>
                    {order.vehicle?.customer?.name}{" "}
                    {order.vehicle?.customer?.lastname}
                  </TableCell>
                  <TableCell>{order.vehicle.plate}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>R$ {order.totalPrice}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => navigate(`/detalhesServico/${order._id}`)}
                    >
                       Detalhes
                    </Button>
                  </TableCell>
                  <TableCell>
                    {order.status !== 'Fechada'?
                    <Icons.edit
                    size={16}
                    onClick={() => navigate(`/editarServico/${order._id}`)}
                  />:null
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-neutral-400 py-4"
                >
                  Nenhuma ordem de serviço encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
