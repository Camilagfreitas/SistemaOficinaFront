import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alertDialog";
import { Button } from "@/components/ui/button";
import { MechanicsCombobox } from "@/components/ui/mechanicsCombobox";
import { ServicesCombobox } from "@/components/ui/servicesCombobox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { VehiclesCombobox } from "@/components/ui/vehiclesCombobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import AddPartModal from "./addPartModal";

const serviceSchema = z.object({
  mechanic: z.string().min(1, "Obrigatório selecionar um colaborador"),
  vehicle: z.string().min(1, "Obrigatório selecionar um veículo"),
  services: z.array(
    z.object({
      serviceType: z.string().min(1, "Tipo de serviço é obrigatório"),
      parts: z.array(
        z.object({
          code: z.string().min(1, "Código da peça é obrigatório"),
          name: z.string().min(1, "Nome da peça é obrigatório"),
          quantity: z.number().min(1, "Quantidade deve ser pelo menos 1").int(),
          price: z.number(),
        })
      ),
    })
  ),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export default function ServiceRegistrationScreen() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);

  const { control, handleSubmit, setValue, getValues } =
    useForm<ServiceFormData>({
      resolver: zodResolver(serviceSchema),
      defaultValues: { services: [] },
    });

  const { fields: serviceFields, append: addService } = useFieldArray({
    control,
    name: "services",
  });

  const handleAddPart = (index: number) => {
    setSelectedServiceIndex(index);
    setIsModalOpen(true);
  };

  const onPartSelected = (part: {
    code: string;
    name: string;
    quantity: number;
    price: number;
  }) => {
    if (selectedServiceIndex !== null) {
      const currentParts =
        getValues(`services.${selectedServiceIndex}.parts`) || [];

      setValue(`services.${selectedServiceIndex}.parts`, [
        ...currentParts,
        part,
      ]);
    }
    setIsModalOpen(false);
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      console.log("Serviço registrado:", data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao registrar serviço:", error);
    }
  };

  const totalLabor = serviceFields.reduce((total, service) => {
    return (
      total +
      service.parts.reduce((sum, part) => {
        return part.code === "1" ? sum + part.price * part.quantity : sum;
      }, 0)
    );
  }, 0);

  const totalParts = serviceFields.reduce((total, service) => {
    return (
      total +
      service.parts.reduce((sum, part) => {
        return part.code !== "1" ? sum + part.price * part.quantity : sum;
      }, 0)
    );
  }, 0);

  return (
    <div className="max-h-screen flex flex-col bg-gray-100">
      <h2 className="pl-[66px] pt-12 pb-[50px] text-neutral-500 text-2xl font-medium">
        Registrar Serviço
      </h2>
      <div className="w-full px-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 gap-10">
            <Controller
              name="vehicle"
              control={control}
              render={({ field }) => (
                <VehiclesCombobox
                  selectedVehicleId={field.value}
                  setValue={setValue}
                />
              )}
            />
            <Controller
              name="mechanic"
              control={control}
              render={({ field }) => (
                <MechanicsCombobox
                  selectedMechanicId={field.value}
                  setValue={setValue}
                />
              )}
            />
          </div>

          {serviceFields.map((service, index) => (
            <div key={service.id} className="p-4 mt-4 rounded-3xl bg-white">
              <Controller
                name={`services.${index}.serviceType`}
                control={control}
                render={({ field }) => (
                  <ServicesCombobox
                    selectedServiceId={field.value}
                    setValue={setValue}
                    name={`services.${index}.serviceType`}
                  />
                )}
              />

              {service.parts && service.parts.length > 0 && (
                <Table className="mt-4 bg-white rounded-3xl">
                  <TableHeader className="h-[60px] text-neutral-400">
                    <TableRow>
                      <TableHead className="px-10 max-w-[70px]">
                        Código
                      </TableHead>
                      <TableHead className="px-10 max-w-[70px]">
                        Descrição
                      </TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Valor Unitário</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {service.parts.map((part, partIndex) => (
                      <TableRow key={partIndex}>
                        <TableCell>{part.name}</TableCell>
                        <TableCell>{part.name}</TableCell>
                        <TableCell>{part.quantity}</TableCell>
                        <TableCell>R$ {part.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleAddPart(index)}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Peça / Mão de obra
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => addService({ serviceType: "", parts: [] })}
              className="mt-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Serviço
            </Button>
          </div>

          <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Resumo</h3>
            <p className="mt-2 text-gray-700">
              Total de Mão de Obra: R$ {totalLabor.toFixed(2)}
            </p>
            <p className="mt-2 text-gray-700">
              Total de Peças: R$ {totalParts.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-center mt-6 gap-[50px]">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/listaServicos")}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              Salvar
            </Button>
          </div>
        </form>
      </div>

      <AddPartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPart={onPartSelected}
      />

      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription className="text-gray-600 text-center text-xl">
              <div>Serviço registrado</div>
              <div className="text-lg">com sucesso!</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/listaServicos")}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
