import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { IGetAllUsersResponse } from "@/types/ApiResponse/IGetAllUsersResponse";
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
import { getAllMechanics } from "./usersService";

export default function UserListScreen() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery<IGetAllUsersResponse[]>({
    queryKey: ["users"],
    queryFn: getAllMechanics,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((user) =>
    `${user.name} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2 className="pl-[66px] pt-12 text-neutral-500 text-2xl font-medium">
        Usuários
      </h2>

      <div className="px-[80px] py-[20px]">
        <div className="flex gap-[40px] mb-4">
          <Input
            startIcon={<Icons.search />}
            placeholder="Procurar Usuário"
            className="bg-white rounded-xl border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            variant="default"
            className="w-auto shadow-md rounded-xl"
            onClick={() => navigate("/cadastroUsuario")}
          >
            Cadastrar Usuário
          </Button>
        </div>

        <Table className="bg-white rounded-3xl">
          <TableHeader className="h-[60px] text-neutral-400">
            <TableRow>
              <TableHead className="px-10">Nome</TableHead>
              <TableHead>Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((user) => (
              <TableRow key={user._id} className="h-[50px] text-neutral-500">
                <TableCell className="px-10">
                  {user.name} {user.lastname}
                </TableCell>
                <TableCell>{user.login}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
