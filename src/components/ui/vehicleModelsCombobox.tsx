"use client"; // Ensure this is at the very top of the file for client-side rendering

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VehicleRegistrationFormData } from "@/features/vehicles/vehicleRegistrationScreen";
import { getModelsByBrand } from "@/features/vehicles/vehiclesService";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";

interface VehicleModelsComboboxProps {
  selectedBrandId: string;
  selectedModelId: string;
  setValue: UseFormSetValue<VehicleRegistrationFormData>;
}

export function VehicleModelsCombobox({
  selectedBrandId,
  selectedModelId,
  setValue,
}: VehicleModelsComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const {
    data: models,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["models", selectedBrandId],
    queryFn: async () => {
      if (selectedBrandId) {
        return await getModelsByBrand(Number(selectedBrandId));
      }
      return [];
    },
  });

  const selectedModel = models?.find(
    (model) => model.label === selectedModelId
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {selectedModel ? `${selectedModel.label}` : "Selecione um modelo ..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Buscar proprietário..." className="h-9" />
          <CommandList>
            {isLoading && <p className="p-2 text-sm">Carregando...</p>}
            {isError && (
              <p className="p-2 text-sm text-red-500">Erro ao carregar.</p>
            )}
            <CommandEmpty>Nenhum modelo encontrado.</CommandEmpty>
            <CommandGroup>
              {models?.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.label}
                  onSelect={() => {
                    setValue("model", model.label);
                    setOpen(false);
                  }}
                >
                  {model.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedBrandId === model.id.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
