import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { IGetAllCustomersResponse } from "@/types/ApiResponse/IGetAllCustomersResponse";
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
import { getAllCustomers } from "./customerService";

export default function CustomerListScreen() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["customers"],
    async queryFn() {
      return await getAllCustomers();
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data?.filter((user: IGetAllCustomersResponse) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2 className="pl-[66px] pt-12 text-neutral-500 text-2xl font-medium">
        Clientes
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
            onClick={() => navigate("/cadastroCliente")}
          >
            Cadastrar Cliente
          </Button>
        </div>

        <Table className="bg-white rounded-3xl">
          <TableHeader className="h-[60px] text-neutral-400">
            <TableRow>
              <TableHead className="px-10">Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((user: IGetAllCustomersResponse) => (
             <TableRow
             key={user._id}
             className="h-[50px] text-neutral-500 cursor-pointer hover:bg-neutral-100"
             onClick={() => navigate(`/detalhesCliente/${user._id}`)} 
           >
             <TableCell className="px-10">{user.name} {user.lastname}</TableCell>
             <TableCell>{user.phone}</TableCell>
             <TableCell>{user.email}</TableCell>
           </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
