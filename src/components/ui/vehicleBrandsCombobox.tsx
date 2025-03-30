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
import { getAllBrands } from "@/features/vehicles/vehiclesService";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";

interface VehicleBrandsComboboxProps {
  selectedBrandId: string;
  setValue: UseFormSetValue<VehicleRegistrationFormData>;
}

export function VehicleBrandsCombobox({
  selectedBrandId,
  setValue,
}: VehicleBrandsComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const {
    data: brands,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

  const selectedBrand = brands?.find(
    (brand) => brand.id.toString() === selectedBrandId
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
          {selectedBrand ? `${selectedBrand.label}` : "Selecione uma marca ..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Buscar marca..." className="h-9" />
          <CommandList>
            {isLoading && <p className="p-2 text-sm">Carregando...</p>}
            {isError && (
              <p className="p-2 text-sm text-red-500">Erro ao carregar.</p>
            )}
            <CommandEmpty>Nenhuma marca encontrada.</CommandEmpty>
            <CommandGroup>
              {brands?.map((brand) => (
                <CommandItem
                  key={brand.id}
                  value={brand.label}
                  onSelect={() => {
                    setValue("brand", brand.id.toString());
                    setOpen(false);
                  }}
                >
                  {brand.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedBrandId === brand.id.toString()
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
