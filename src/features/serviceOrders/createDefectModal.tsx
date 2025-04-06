import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postRegisterDefectCategory } from "./serviceOrderService";

interface CreateDefectModalProps {
  onSuccess: () => void;
}

const defectRegistrationSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
});

export type DefectRegistrationFormData = z.infer<
  typeof defectRegistrationSchema
>;

export default function CreatePartModal({ onSuccess }: CreateDefectModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DefectRegistrationFormData>({
    resolver: zodResolver(defectRegistrationSchema),
  });

  const onSubmit = async (data: DefectRegistrationFormData) => {
    try {
      await postRegisterDefectCategory(data);
      queryClient.invalidateQueries({ queryKey: ["services"] });
      onSuccess();
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
    }
  };

  return (
    <DialogContent className="bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="pb-3 text-neutral-500 text-xl font-medium">
            Cadastrar Serviço
          </DialogTitle>
          <DialogDescription>
            <div>
              <Input
                {...register("name")}
                placeholder="Nome"
                className="max-w-50 mb-3"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant="default" className="rounded-xl">
            Cadastrar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
