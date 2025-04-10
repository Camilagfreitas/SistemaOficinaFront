import { Icons } from "@/assets/icons";
import { Input } from "@/components/ui/Input";
import { IGetInventoryItem } from "@/types/ApiResponse/IGetInventoryResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import CreatePartModal from "./createPartModal";
import { deletePart, getInventory, updatePartQuantity } from "./inventoryService";

export default function InventoryListScreen() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["inventory"],
    async queryFn() {
      return await getInventory();
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: (variables: { partId: string, newQuantity: number }) =>
      updatePartQuantity( variables.partId, variables.newQuantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar quantidade", error.message);
    }
  });

  const handleQuantityChange = async ( partId: string, newQuantity: number) => {
    if (newQuantity < 0) return; 
    await updateQuantityMutation.mutateAsync({ partId, newQuantity: newQuantity });
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data?.parts.filter(
    (item: IGetInventoryItem) =>
      item.part.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.part.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  const handleDelete = async (id: string) => {
    await deletePart(id);
  };

  return (
    <div>
      <h2 className="pl-[66px] pt-12 text-neutral-500 text-2xl font-medium">
        Estoque
      </h2>

      <div className="px-[80px] py-[20px]">
        <div className="flex gap-[40px] mb-4">
          <Input
            startIcon={<Icons.search />}
            placeholder="Procurar Peça"
            className="bg-white rounded-xl border-none max-w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-auto shadow-md rounded-xl bg-red-600 text-neutral-100 ">
            <CreatePartModal />
          </div>
        </div>

        <Table className="bg-white rounded-3xl">
          <TableHeader className="h-[60px] text-neutral-400">
            <TableRow>
              <TableHead className="px-10 max-w-[70px]">Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor Unitário</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
  {filteredData
    ?.sort((a, b) => {
      if (a.quantity === 0 && b.quantity > 0) return 1;
      if (a.quantity > 0 && b.quantity === 0) return -1;
      return 0; 
    })
    .map((item: IGetInventoryItem) => (
      item.part.code != "1"&& 
      <TableRow
        key={item.part._id}
        className="h-[50px] text-neutral-500 gap-2"
      >
        <TableCell className="px-10 max-w-[70px]">
          {item.part.code}
        </TableCell>
        <TableCell>{item.part.description}</TableCell>
        <TableCell>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item.part._id, parseInt(e.target.value))
            }
            className="w-[80px] text-center"
          />
        </TableCell>
        <TableCell>R$ {item.part.price}</TableCell>
        <TableCell onClick={() => handleDelete(item.part._id)}>
          <Icons.trash />
        </TableCell>
      </TableRow>
    ))}
</TableBody>
        </Table>
      </div>
    </div>
  );
}
