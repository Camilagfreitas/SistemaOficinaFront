import { Icons } from "@/assets/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "./SideBar";

export function AppSidebar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Estado para controlar qual item está aberto
  const navigate = useNavigate();
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Alterna entre abrir e fechar
  };

  return (
    <SidebarMenu>
      <div className="w-70">
        <h2 className="pt-[90px] pb-[60px] text-neutral-800 text-[36px] text-center">
          Auto <span className="font-semibold text-red-700">Elite</span>
        </h2>
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`font-medium text-[18px] ${
              openIndex === 0
                ? "bg-neutral-200 text-red-700 h-[60px]"
                : "bg-transparent text-neutral-500 h-[45px]"
            } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
            onClick={() => navigate("/home")}
          >
            <Icons.home className="mr-[18px] ml-[20px]" />
            Início
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Menu Pessoas */}
        <SidebarMenuItem>
          <Collapsible
            open={openIndex === 1}
            onOpenChange={() => handleToggle(1)}
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 1
                    ? "bg-neutral-200 text-red-700 h-[60px]"
                    : "bg-transparent text-neutral-500 h-[45px]"
                } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
              >
                <Icons.computer className="mr-[18px] ml-[20px]" />
                Usuários
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem onClick={() => navigate("/listarUsuario")}>
                  Ver todos
                </SidebarMenuSubItem>
                <SidebarMenuSubItem
                  onClick={() => navigate("/cadastrarUsuario")}
                >
                  Cadastrar
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        {/* Menu Pessoas */}
        <SidebarMenuItem>
          <Collapsible
            open={openIndex === 2}
            onOpenChange={() => handleToggle(2)}
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 2
                    ? "bg-neutral-200 text-red-700 h-[60px]"
                    : "bg-transparent text-neutral-500 h-[45px]"
                } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
              >
                <Icons.user className="mr-[18px] ml-[20px]" />
                Clientes
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem onClick={() => navigate("/listaClientes")}>
                  Ver todos
                </SidebarMenuSubItem>
                <SidebarMenuSubItem
                  onClick={() => navigate("/cadastroCliente")}
                >
                  Cadastrar
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        {/* Menu Carros */}
        <SidebarMenuItem>
          <Collapsible
            open={openIndex === 3}
            onOpenChange={() => handleToggle(3)}
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 3
                    ? "bg-neutral-200 text-red-700 h-[60px]"
                    : "bg-transparent text-neutral-500 h-[45px]"
                } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
              >
                <Icons.car className="mr-[18px] ml-[20px]" />
                Carros
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem onClick={() => navigate("/listaVeiculos")}>
                  Ver todos
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>Cadastrar</SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <Collapsible
            open={openIndex === 4}
            onOpenChange={() => handleToggle(4)}
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 4
                    ? "bg-neutral-200 text-red-700 h-[60px]"
                    : "bg-transparent text-neutral-500 h-[45px]"
                } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
              >
                <Icons.document className="mr-[18px] ml-[20px] " />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Ordens de Serviço
                </span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>Ver todos</SidebarMenuSubItem>
                <SidebarMenuSubItem
                  onClick={() => navigate("/cadastroOrdemServico")}
                >
                  Cadastrar
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <Collapsible
            open={openIndex === 5}
            onOpenChange={() => handleToggle(5)}
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 5
                    ? "bg-neutral-200 text-red-700 h-[60px]"
                    : "bg-transparent text-neutral-500 h-[45px]"
                } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
              >
                <Icons.boxes className="mr-[18px] ml-[20px]" />
                Estoque
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem onClick={() => navigate("/listaEstoque")}>
                  Ver estoque
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>Cadastrar peça</SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className={`font-medium text-[18px] ${
              openIndex === 6
                ? "bg-neutral-200 text-red-700 h-[60px]"
                : "bg-transparent text-neutral-500 h-[45px]"
            } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
          >
            <Icons.info className="mr-[18px] ml-[20px]" />
            Análises
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>
    </SidebarMenu>
  );
}
