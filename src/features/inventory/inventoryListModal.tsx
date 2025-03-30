import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import {
  IGetInventoryItem,
  IPart,
} from "@/types/ApiResponse/IGetInventoryResponse";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { getInventory } from "./inventoryService";

export default function InventoryListModal({
  isOpen,
  onClose,
  onSelectPart,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectPart: (part: IPart) => void;
}) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["inventory"],
    async queryFn() {
      return await getInventory();
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data?.parts.filter(
    (item: IGetInventoryItem) =>
      item.part.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.part.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-neutral-500 text-2xl font-medium">
            Estoque
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="flex gap-4 mb-4">
            <Input
              startIcon={<Icons.search />}
              placeholder="Procurar Peça"
              className="bg-white rounded-xl max-w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table className="bg-white rounded-3xl">
            <TableHeader className="h-[60px] text-neutral-400">
              <TableRow>
                <TableHead className="px-10 max-w-[70px]">Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor Unitário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData?.map((item: IGetInventoryItem) => (
                <TableRow
                  key={item.part._id}
                  className="h-[50px] text-neutral-500 gap-2"
                >
                  <TableCell className="px-10 max-w-[70px]">
                    {item.part.code}
                  </TableCell>
                  <TableCell>{item.part.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>R$ {item.part.price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        onSelectPart(item.part);
                        onClose();
                      }}
                    >
                      Selecionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
