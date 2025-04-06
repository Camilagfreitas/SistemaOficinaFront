"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateDefectModal from "@/features/serviceOrders/createDefectModal";
import { getDefectCategories } from "@/features/serviceOrders/serviceOrderService";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, Plus } from "lucide-react";
import * as React from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

interface ServicesComboboxProps<T extends FieldValues> {
  selectedServiceId: string;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
}

export function ServicesCombobox<T extends FieldValues>({
  selectedServiceId,
  setValue,
  name,
}: ServicesComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getDefectCategories,
  });

  const selectedService = services?.find(
    (service) => service._id === selectedServiceId
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[450px] justify-between bg-white text-neutral-500"
          >
            {selectedService
              ? `${selectedService.name}`
              : "Selecione um serviço..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[450px] p-0 bg-white">
          <Command>
            <CommandInput placeholder="Buscar serviço..." className="h-9" />
            <CommandList>
              {isLoading && <p className="p-2 text-sm">Carregando...</p>}
              {isError && (
                <p className="p-2 text-sm text-red-500">Erro ao carregar.</p>
              )}
              <CommandEmpty>Nenhum serviço encontrado.</CommandEmpty>
              <CommandGroup>
                {services?.map((service) => (
                  <CommandItem
                    key={service._id}
                    value={service.name}
                    onSelect={() => {
                      setValue(name, service._id as PathValue<T, Path<T>>);
                      setOpen(false);
                    }}
                  >
                    {service.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedServiceId === service._id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  setModalOpen(true);
                }}
                className="flex items-center justify-between text-red-500 cursor-pointer"
              >
                Adicionar Serviço <Plus className="w-4 h-4" />
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <CreateDefectModal onSuccess={() => setModalOpen(false)} />
      </Dialog>
    </>
  );
}
