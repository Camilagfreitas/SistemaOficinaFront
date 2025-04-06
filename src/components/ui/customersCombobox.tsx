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
import { getAllCustomers } from "@/features/customers/customerService";
import { cn } from "@/lib/utils";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

interface CustomersComboboxProps<T extends FieldValues> {
  selectedCustomerId: string;
  setValue: UseFormSetValue<T>;
}

export function CustomersCombobox<T extends FieldValues>({
  selectedCustomerId,
  setValue,
}: CustomersComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  const selectedCustomer = customers?.find(
    (customer) => customer._id === selectedCustomerId
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
          {selectedCustomer
            ? `${selectedCustomer.name} ${selectedCustomer.lastname}`
            : "Selecione um proprietário..."}
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
            <CommandEmpty>Nenhum proprietário encontrado.</CommandEmpty>
            <CommandGroup>
              {customers?.map((customer) => (
                <CommandItem
                  key={customer._id}
                  value={`${customer.name} ${customer.lastname ?? ""}`}
                  onSelect={() => {
                    console.log(customer);
                    setValue(
                      "customer" as Path<T>,
                      customer._id as PathValue<T, Path<T>>
                    );
                    setOpen(false);
                  }}
                >
                  {customer.name} {customer.lastname ?? ""}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedCustomerId === customer._id
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
