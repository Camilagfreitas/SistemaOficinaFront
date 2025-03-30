import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postRegisterDefectCategory } from "./serviceOrderService";

const defectRegistrationSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string(),
});

export type DefectRegistrationFormData = z.infer<
  typeof defectRegistrationSchema
>;

export default function CreatePartModal() {
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
    } catch (error) {
      console.error("Erro ao cadastrar carro:", error);
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
                className="max-w-36 mb-3"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Textarea
                {...register("description")}
                placeholder="Descrição"
                className="mb-3"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
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
