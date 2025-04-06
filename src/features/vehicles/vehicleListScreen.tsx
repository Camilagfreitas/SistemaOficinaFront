import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { IGetAllVehiclesResponse } from "@/types/ApiResponse/IGetAllVehiclesResponse";
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
import { getAllVehicles } from "./vehiclesService";

export default function VehicleListScreen() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["vehicles"],
    async queryFn() {
      return await getAllVehicles();
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data?.filter(
    (vehicle: IGetAllVehiclesResponse) =>
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.customer.lastname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2 className="pl-[66px] pt-12 text-neutral-500 text-2xl font-medium">
        Veículos
      </h2>

      <div className="px-[80px] py-[20px]">
        <div className="flex gap-[40px] mb-4">
          <Input
            startIcon={<Icons.search />}
            placeholder="Procurar Veículo"
            className="bg-white rounded-xl border-none max-w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            variant="default"
            className="w-auto shadow-md rounded-xl"
            onClick={() => navigate("/cadastroVeiculo")}
          >
            Cadastrar Veículo
          </Button>
        </div>

        <Table className="bg-white rounded-3xl">
          <TableHeader className="h-[60px] text-neutral-400">
            <TableRow>
              <TableHead className="px-10 max-w-[70px]">Placa</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Proprietário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((vehicle: IGetAllVehiclesResponse) => (
              <TableRow
                key={vehicle._id}
                className="h-[50px] text-neutral-500 gap-2"
              >
                <TableCell className="px-10 max-w-[70px]">
                  {vehicle.plate}
                </TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.color}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>
                  {vehicle.customer.name} {vehicle.customer.lastname}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
