import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alertDialog";
import { Button } from "@/components/ui/button";
import { CustomersCombobox } from "@/components/ui/customersCombobox";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textArea";
import { VehicleBrandsCombobox } from "@/components/ui/vehicleBrandsCombobox";
import { VehicleModelsCombobox } from "@/components/ui/vehicleModelsCombobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { postRegisterVehicle } from "./vehiclesService";

const vehicleRegistrationSchema = z.object({
  plate: z.string().min(1, "A placa é obrigatória"),
  customer: z.string().min(1, "Obrigatório selecionar um proprietário"),
  mileage: z
    .string()
    .min(1, "Obrigatório cadastrar kilometragem")
    .transform((value) => Number(value)),
  brand: z.string().min(1, "Obrigatório adicionar marca"),
  model: z.string().min(2, "Obrigatório adicionar modelo"),
  chassis: z.string(),
  year: z.string().min(4, "O ano é obrigatório"),
  color: z.string().min(1, "Adicionar cor"),
  fuel: z.string().min(1, "Selecione o tipo de combustível"),
  inspection: z.string(),
  notes: z.string(),
});

export type VehicleRegistrationFormData = z.infer<
  typeof vehicleRegistrationSchema
>;

export default function VehicleRegistrationScreen() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VehicleRegistrationFormData>({
    resolver: zodResolver(vehicleRegistrationSchema),
  });

  const brandId = useWatch({ control, name: "brand" });

  const onSubmit = async (data: VehicleRegistrationFormData) => {
    try {
      await postRegisterVehicle(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao cadastrar carro:", error);
    }
  };

  return (
    <div className="max-h-screen flex flex-col bg-gray-100">
      <h2 className="pl-[66px] pt-12 pb-[50px] text-neutral-500 text-2xl font-medium">
        Cadastrar Veículo
      </h2>
      <div className="w-full px-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-md mx-auto"
        >
          <div className="grid grid-cols-2 gap-10">
            <div>
              <Input {...register("plate")} placeholder="Placa" />
              {errors.plate && (
                <p className="text-red-500 text-sm">{errors.plate.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="customer"
                control={control}
                render={({ field }) => (
                  <CustomersCombobox
                    selectedCustomerId={field.value}
                    setValue={setValue}
                  />
                )}
              />
              {errors.customer && (
                <p className="text-red-500 text-sm">
                  {errors.customer.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="number"
                {...register("mileage")}
                placeholder="Kilometragem"
              />
              {errors.mileage && (
                <p className="text-red-500 text-sm">{errors.mileage.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <VehicleBrandsCombobox
                    selectedBrandId={field.value}
                    setValue={setValue}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <VehicleModelsCombobox
                    selectedModelId={field.value}
                    setValue={setValue}
                    selectedBrandId={brandId}
                  />
                )}
              />
            </div>

            <div>
              <Input {...register("chassis")} placeholder="Chassi" />
            </div>
            <div>
              <Input type="number" {...register("year")} placeholder="Ano" />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year.message}</p>
              )}
            </div>
            <div>
              <Input {...register("color")} placeholder="Cor" />
              {errors.color && (
                <p className="text-red-500 text-sm">{errors.color.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="fuel"
                control={control}
                render={() => (
                  <Select onValueChange={(value) => setValue("fuel", value)}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Combustível" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="gasolina">Gasolina</SelectItem>
                      <SelectItem value="alcool">Álcool</SelectItem>
                      <SelectItem value="flex">Flex</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.fuel && (
                <p className="text-red-500 text-sm">{errors.fuel.message}</p>
              )}
            </div>
            <div>
              <Textarea {...register("inspection")} placeholder="Inspeção" />
            </div>
            <div>
              <Textarea {...register("notes")} placeholder="Observações" />
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-[50px]">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/listaVeiculos")}
              className="rounded-xl bg-neutral-300 text-white"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="default" className="rounded-xl">
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
        <AlertDialogContent className="rounded-lg bg-white p-6 shadow-lg max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-gray-600 text-center text-xl">
              <div>Veículo cadastrado</div>
              <div className="text-lg">com sucesso!</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center mt-4">
            <AlertDialogAction
              onClick={() => navigate("/listaVeiculos")}
              className="text-gray-100 hover:shadow-lg self-center px-4 py-2 rounded-md shadow-sm"
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
