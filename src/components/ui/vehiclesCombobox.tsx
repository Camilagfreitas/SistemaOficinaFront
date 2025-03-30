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
import { getAllVehicles } from "@/features/vehicles/vehiclesService";
import { cn } from "@/lib/utils";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

interface VehiclesComboboxProps<T extends FieldValues> {
  selectedVehicleId: string;
  setValue: UseFormSetValue<T>;
}

export function VehiclesCombobox<T extends FieldValues>({
  selectedVehicleId,
  setValue,
}: VehiclesComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  const {
    data: vehicles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const selectedVehicle = vehicles?.find(
    (vehicle) => vehicle._id === selectedVehicleId
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between bg-white  text-neutral-500"
        >
          {selectedVehicle
            ? `${selectedVehicle.plate}`
            : "Selecione um veículo..."}
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
            <CommandEmpty>Nenhum veículo encontrado.</CommandEmpty>
            <CommandGroup>
              {vehicles?.map((vehicle) => (
                <CommandItem
                  key={vehicle._id}
                  value={vehicle.plate}
                  onSelect={() => {
                    setValue(
                      "vehicle" as Path<T>,
                      vehicle._id as PathValue<T, Path<T>>
                    );
                    setOpen(false);
                  }}
                >
                  {vehicle.plate}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedVehicleId === vehicle._id
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
