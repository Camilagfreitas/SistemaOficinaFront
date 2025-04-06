import { Input } from "@/components/ui/Input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alertDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/ui/multiSelect";
import { Textarea } from "@/components/ui/textArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getAllBrands, getModelsByBrand } from "../vehicles/vehiclesService";
import { addPart } from "./inventoryService";

const partRegistrationSchema = z.object({
  code: z.string().min(1, "O código é obrigatório"),
  description: z.string(),
  quantity: z
    .string()
    .min(1, "A quantidade é obrigatória")
    .transform((value) => Number(value)),
  price: z.string().min(1, "O valor é obrigatório"),
  models: z.array(z.string()).optional(),
});

export type PartRegistrationFormData = z.infer<typeof partRegistrationSchema>;

export default function CreatePartModal() {
  const { data } = useQuery({
    queryKey: ["brands"],
    async queryFn() {
      return await getAllBrands();
    },
  });

  const [selectedBrands, setSelectedBrands] = useState<
    { label: string; value: string; id: number }[]
  >([]);
  const [allModels, setAllModels] = useState<
    { label: string; value: string; id: number }[]
  >([]);
  const [selectedModels, setSelectedModels] = useState<
    { label: string; value: string; id: number }[]
  >([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PartRegistrationFormData>({
    resolver: zodResolver(partRegistrationSchema),
  });

  const onSubmitPart = async (data: PartRegistrationFormData) => {
    try {
      await addPart(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao cadastrar peça:", error);
    }
  };

  useEffect(() => {
    async function fetchModels() {
      if (!selectedBrands.length) return;
      let allModels: { label: string; value: string; id: number }[] = [];

      for (const brand of selectedBrands) {
        try {
          const models = await getModelsByBrand(brand.id);
          allModels = [...allModels, ...models];
        } catch (error) {
          console.error(
            `Erro ao buscar modelos para a marca ${brand.label} (ID: ${brand.value}):`,
            error
          );
        }
      }
      setAllModels(allModels);
    }

    fetchModels();
  }, [selectedBrands]);

  return (
    <>
      <Dialog>
        <DialogTrigger className="text-sm whitespace-nowrap p-3">
          Cadastrar Peça
        </DialogTrigger>
        <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmitPart)}>
            <DialogHeader>
              <DialogTitle className="pb-3 text-neutral-500 text-xl font-medium">
                Cadastrar Peça
              </DialogTitle>
              <DialogDescription />
              <div>
                <div>
                  <Input
                    {...register("code")}
                    placeholder="Código"
                    className="max-w-36 mb-3"
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm">
                      {errors.code.message}
                    </p>
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
                <div>
                  <Input
                    {...register("quantity")}
                    placeholder="Quantidade"
                    className="max-w-32 mb-3"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
                <div>
                  <MultiSelect
                    options={data!}
                    onValueChange={setSelectedBrands}
                    defaultValue={selectedBrands.map((brand) => brand.value)}
                    placeholder="Marcas"
                    variant="default"
                  />
                </div>
                <div>
                  <MultiSelect
                    options={allModels}
                    onValueChange={setSelectedModels}
                    defaultValue={selectedModels.map((brand) => brand.value)}
                    placeholder="Modelos"
                    variant="default"
                  />
                  {errors.models && (
                    <p className="text-red-500 text-sm">
                      {errors.models.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("price")}
                    placeholder="Preço Unitário"
                    className="max-w-36"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button variant="default" className="rounded-xl" type="submit">
                Cadastrar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
        <AlertDialogContent className="rounded-lg bg-white p-6 shadow-lg max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-gray-600 text-center text-xl">
              <p>Peça cadastrada</p>
              <span className="text-lg">com sucesso!</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center mt-4">
            <AlertDialogAction
              onClick={() => navigate("/listaEstoque")}
              className="text-gray-100 hover:shadow-lg self-center px-4 py-2 rounded-md shadow-sm"
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
