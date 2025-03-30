import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { IPart } from "@/types/ApiResponse/IGetInventoryResponse";
import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { useState } from "react";
import InventoryListModal from "../inventory/inventoryListModal";

interface AddPartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPart: (part: { name: string; quantity: number }) => void;
}

export default function AddPartModal({
  isOpen,
  onClose,
  onAddPart,
}: AddPartModalProps) {
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<IPart | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSelectPart = (part: IPart) => {
    setSelectedPart(part);
    setIsInventoryModalOpen(false);
  };

  const handleConfirm = () => {
    if (selectedPart && quantity > 0) {
      onAddPart({ name: selectedPart.description, quantity });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black opacity-50" />

      <DialogContent className="fixed inset-0 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-fit h-fit max-h-[400px] flex flex-col gap-4">
          <DialogTitle />
          <DialogDescription />
          <Button
            variant="outline"
            onClick={() => setIsInventoryModalOpen(true)}
          >
            {selectedPart ? selectedPart.description : "Selecionar Peça"}
          </Button>
          {selectedPart && (
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Quantidade"
            />
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedPart}>
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>

      <InventoryListModal
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
        onSelectPart={handleSelectPart}
      />
    </Dialog>
  );
}
