import { Icons } from "@/assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const location = useLocation();
  const navigate = useNavigate();

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isActive = (path: string) => (location.pathname === path && openIndex === null);

  useEffect(() => {
    // Abrir o Collapsible quando o usuário estiver em uma página de subitem
    if (isActive("/listaUsuarios") || isActive("/cadastroUsuario")) {
      setOpenIndex(1); 
    } else if (isActive("/listaClientes") || isActive("/cadastroCliente")) {
      setOpenIndex(2); 
    } else if (isActive("/listaVeiculos") || isActive("/cadastroVeiculo")) {
      setOpenIndex(3); 
    } else if (isActive("/listaServicos") || isActive("/cadastroServico")) {
      setOpenIndex(4); 
    } else if (isActive("/listaEstoque")) {
      setOpenIndex(5); 
    } else {
      setOpenIndex(null); 
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const handleMenuClick = (path: string, index: number | null) => {
    setOpenIndex(index);
    navigate(path);
  };

  const isSubItemActive = (subPath: string) => location.pathname === subPath;

  return (
    <SidebarMenu className="print:hidden flex flex-col h-full">
      <div className="w-70 flex flex-col flex-grow">
        <h2 className="pt-[90px] pb-[60px] text-neutral-800 text-[36px] text-center">
          Auto <span className="font-semibold text-red-700">Elite</span>
        </h2>

        {/* Início */}
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`font-medium text-[18px] ${
              isActive("/home")
                ? "bg-neutral-200 text-red-700 h-[60px]"
                : "bg-transparent text-neutral-500 h-[45px]"
            } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
            onClick={() => handleMenuClick("/home", null)}
          >
            <Icons.home className="mr-[18px] ml-[20px]" />
            Início
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Menu Pessoas */}
        <SidebarMenuItem>
          <Collapsible open={openIndex === 1} onOpenChange={() => setOpenIndex(openIndex === 1 ? null : 1)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 1 || isActive("/listaUsuarios") || isActive("/cadastroUsuario")
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
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/listaUsuarios", 1)}
                  className={`cursor-pointer ${
                    isSubItemActive("/listaUsuarios") ? "font-bold" : ""
                  }`}
                >
                  Ver todos
                </SidebarMenuSubItem>
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/cadastroUsuario", 1)}
                  className={`cursor-pointer ${
                    isSubItemActive("/cadastroUsuario") ? "font-bold" : ""
                  }`}
                >
                  Cadastrar
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        {/* Menu Clientes */}
        <SidebarMenuItem>
          <Collapsible open={openIndex === 2} onOpenChange={() => setOpenIndex(openIndex === 2 ? null : 2)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 2 || isActive("/listaClientes") || isActive("/cadastroCliente")
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
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/listaClientes", 2)}
                  className={`cursor-pointer ${
                    isSubItemActive("/listaClientes") ? "font-bold" : ""
                  }`}
                >
                  Ver todos
                </SidebarMenuSubItem>
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/cadastroCliente", 2)}
                  className={`cursor-pointer ${
                    isSubItemActive("/cadastroCliente") ? "font-bold" : ""
                  }`}
                >
                  Cadastrar
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        {/* Menu Carros */}
        <SidebarMenuItem>
          <Collapsible open={openIndex === 3} onOpenChange={() => setOpenIndex(openIndex === 3 ? null : 3)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 3 || isActive("/listaVeiculos") || isActive("/cadastroVeiculo")
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
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/listaVeiculos", 3)}
                  className={`cursor-pointer ${
                    isSubItemActive("/listaVeiculos") ? "font-bold" : ""
                  }`}
                >
                  Ver todos
                </SidebarMenuSubItem>
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/cadastroVeiculo", 3)}
                  className={`cursor-pointer ${
                    isSubItemActive("/cadastroVeiculo") ? "font-bold" : ""
                  }`}
                >
                  Cadastrar
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        {/* Menu Ordens de Serviço */}
        <SidebarMenuItem>
          <Collapsible open={openIndex === 4} onOpenChange={() => setOpenIndex(openIndex === 4 ? null : 4)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 4 || isActive("/listaServicos") || isActive("/cadastroServico")
                    ? "bg-neutral-200 text-red-700 h-[60px]"
                    : "bg-transparent text-neutral-500 h-[45px]"
                } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
              >
                <Icons.document className="mr-[18px] ml-[20px]" />
                Ordens de Serviço
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/listaServicos", 4)}
                  className={`cursor-pointer ${
                    isSubItemActive("/listaServicos") ? "font-bold" : ""
                  }`}
                >
                  Ver todos
                </SidebarMenuSubItem>
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/cadastroServico", 4)}
                  className={`cursor-pointer ${
                    isSubItemActive("/cadastroServico") ? "font-bold" : ""
                  }`}
                >
                  Cadastrar
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        {/* Menu Estoque */}
        <SidebarMenuItem>
          <Collapsible open={openIndex === 5} onOpenChange={() => setOpenIndex(openIndex === 5 ? null : 5)}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={`font-medium text-[18px] ${
                  openIndex === 5 || isActive("/listaEstoque")
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
                <SidebarMenuSubItem
                  onClick={() => handleMenuClick("/listaEstoque", 5)}
                  className={`cursor-pointer ${
                    isSubItemActive("/listaEstoque") ? "font-bold" : ""
                  }`}
                >
                  Gerenciar estoque
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>

        {/* Menu Análises */}
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`font-medium text-[18px] ${
              isActive("/analises")
                ? "bg-neutral-200 text-red-700 h-[60px]"
                : "bg-transparent text-neutral-500 h-[45px]"
            } w-[calc(100%-20px)] rounded-r-full pr-[20px]`}
          >
            <Icons.info className="mr-[18px] ml-[20px]" />
            Análises
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="mt-auto">
          <SidebarMenuButton
            className="font-medium text-[16px] bg-transparent text-red-500 h-[45px] w-[calc(100%-20px)] rounded-r-full pr-[20px] mt-auto"
            onClick={handleLogout}
          >
            <Icons.logout className="mr-[18px] ml-[20px] text-red500" />
            Sair
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>
    </SidebarMenu>
  );
}
