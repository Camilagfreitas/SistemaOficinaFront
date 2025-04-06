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
import { getAllMechanics } from "@/features/users/usersService";
import { cn } from "@/lib/utils";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

interface MechanicsComboboxProps<T extends FieldValues> {
  selectedMechanicId: string;
  setValue: UseFormSetValue<T>;
}

export function MechanicsCombobox<T extends FieldValues>({
  selectedMechanicId,
  setValue,
}: MechanicsComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  const {
    data: mechanics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mechanics"],
    queryFn: getAllMechanics,
  });

  const selectedMechanics = mechanics?.find(
    (mechanics) => mechanics._id === selectedMechanicId
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between bg-white text-neutral-500"
        >
          {selectedMechanics
            ? `${selectedMechanics.name} ${selectedMechanics.lastname}`
            : "Selecione um colaborador..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Buscar colaborador..." className="h-9" />
          <CommandList>
            {isLoading && <p className="p-2 text-sm">Carregando...</p>}
            {isError && (
              <p className="p-2 text-sm text-red-500">Erro ao carregar.</p>
            )}
            <CommandEmpty>Nenhum colaborador encontrado.</CommandEmpty>
            <CommandGroup>
              {mechanics?.map((mechanic) => (
                <CommandItem
                  key={mechanic._id}
                  value={`${mechanic.name} ${mechanic.lastname ?? ""}`}
                  onSelect={() => {
                    setValue(
                      "mechanic" as Path<T>,
                      mechanic._id as PathValue<T, Path<T>>
                    );
                    setOpen(false);
                  }}
                >
                  {mechanic.name} {mechanic.lastname ?? ""}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedMechanicId === mechanic._id
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
