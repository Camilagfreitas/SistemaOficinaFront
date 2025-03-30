import React, { useState } from "react";
import { Input } from "./Input";

type CpfCnpjProps = {
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>, type: "CPF" | "CNPJ") => void;
  type?: string;
};

export const DocumentInput = ({ value, onChange, type = "tel" }: CpfCnpjProps) => {
  const TYPES = {
    CPF: "999.999.999-99",
    CNPJ: "99.999.999/9999-99",
  };

  const MAX_LENGTH = 14; // Para CPF ou CNPJ, o máximo é 14 (CNPJ)

  const [formattedValue, setFormattedValue] = useState<string>(value || "");

  function onLocalChange(ev: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = clear(ev.target.value);
    const mask = getMask(inputValue);

    if (inputValue.length > MAX_LENGTH) return;

    // Aplica a máscara
    inputValue = applyMask(inputValue, TYPES[mask]);

    // Atualiza o valor formatado
    setFormattedValue(inputValue);

    // Chama o onChange com a máscara correta
    onChange(ev, mask);
  }

  function getMask(value: string): "CPF" | "CNPJ" {
    return value.length > 11 ? "CNPJ" : "CPF";
  }

  function applyMask(value: string, mask: string): string {
    let result = "";
    let valueIndex = 0;

    // Verificando o valor e aplicando a máscara
    for (let i = 0; i < mask.length; i++) {
      if (mask[i].match(/[0-9]/)) {
        // Preenche com os números
        if (valueIndex < value.length) {
          result += value[valueIndex];
          valueIndex++;
        }
      } else {
        // Adiciona os caracteres da máscara
        result += mask[i];
      }
    }
    return result;
  }

  function clear(value: string): string {
    return value.replace(/[^0-9]/g, "");
  }

  return <Input {...{ value: formattedValue, onChange: onLocalChange, type }} placeholder="Documento"/>;
};
