import { Icons } from "@/assets/icons";
import { Card } from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="pl-[66px] pt-12 text-neutral-500 text-2xl font-semibold">
        Seja bem-vinda, <span className="font-bold text-red-700">Camila</span>
      </h2>

      {/* Container dos cards centralizados */}
      <div className="flex justify-center mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <Card
            className="w-54"
            icon={<Icons.computer />}
            title="Usuarios"
            onClick={() => navigate("/listaUsuarios")}
          />
          <Card
            className="w-54"
            icon={<Icons.user />}
            title="Clientes"
            onClick={() => navigate("/listaClientes")}
          />
          <Card
            className="w-54"
            icon={<Icons.car />}
            title="Carros"
            onClick={() => navigate("/listaVeiculos")}
          />
          <Card
            className="w-54"
            icon={<Icons.document />}
            title="Ordens de Serviço"
            onClick={() => navigate("/cadastroOrdemServico")}
          />
          <Card
            className="w-54"
            icon={<Icons.boxes />}
            title="Estoque"
            onClick={() => navigate("/listaEstoque")}
          />
          <Card className="w-54" icon={<Icons.info />} title="Análise" />
        </div>
      </div>
    </div>
  );
}
