import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ServiceOrderPrint from "./serviceOrderPrint";
import { closeServiceOrder, getServiceOrderById} from "./serviceOrderService";

export default function ServiceDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["serviceOrderDetails"],
    async queryFn() {
      return await getServiceOrderById(id ?? "");
    },
  });

  if (!data) {
    return <div className="p-10">Nenhuma ordem de serviço encontrada.</div>;
  }

  const totalLabor = data.services.reduce((total, service) => {
    return (
      total +
      service.details.reduce((sum, detail) => {
        return detail.part.code === "1"
          ? sum + detail.price * detail.quantity
          : sum;
      }, 0)
    );
  }, 0);

  const totalParts = data.services.reduce((total, service) => {
    return (
      total +
      service.details.reduce((sum, detail) => {
        return detail.part.code !== "1"
          ? sum + detail.price * detail.quantity
          : sum;
      }, 0)
    );
  }, 0);

  const handlePrint = async () => {
    window.print();
  };

  const handleFinish = async () => {
    if(data.status !=='CLOSED'){
    await closeServiceOrder(data, id??'');
    }
  };

  return (
    <div className="max-h-screen flex flex-col bg-gray-100">
      <h2 className="pl-[66px] pt-12 pb-[50px] text-neutral-500 text-2xl font-medium print:hidden">
        Ordem de Serviço
      </h2>
      <div className="w-full px-20 max-w-5xl mx-auto print:hidden">
        {data.status !== 'CLOSED' && (
          <div className="flex justify-end mb-4">
            <Button
              size="sm"
              variant="default"
              onClick={() => handleFinish}
            >
              Finalizar Ordem
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-10 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-red-700 font-bold">Informações do Veículo:</p>
            <p className="font-medium pt-1">Placa: {data.vehicle.plate}</p>
            <p className="font-medium pt-1">Modelo: {data.vehicle.model}</p>
            <p className="font-medium pt-1">
              Kilometragem: {data.vehicle.mileage} KM
            </p>
            <p className="font-medium pt-1">Ano: {data.vehicle.year}</p>
            <p className="font-medium pt-1">
              <strong>Proprietário: </strong>
              {data.vehicle.customer.name} {data.vehicle.customer.lastname}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between">
              <p className="text-red-700 font-bold pt-1">Data:</p>
              <p className="font-medium">
                {new Date(data.createdAt || new Date()).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
            </div>

            <p className="text-red-700 font-bold pt-2">Colaborador:</p>
            <p className="font-medium">
              {data.user.name} {data.user.lastname}
            </p>
          </div>
        </div>

        {data.services.map((service, index) => (
          <div key={index} className="p-4 mt-4 rounded-3xl bg-white">
            <h3 className="text-gray-700 font-semibold mb-2">
              Serviço: {service.category.name}
            </h3>
            {service.details.length > 0 && (
              <Table className="mt-4 bg-white rounded-3xl">
                <TableHeader className="h-[60px] text-neutral-400">
                  <TableRow>
                    <TableHead className="px-10">Código</TableHead>
                    <TableHead className="px-10">Descrição</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.details.map((service, partIndex) => (
                    <TableRow key={partIndex}>
                      <TableCell>{service.part.code}</TableCell>
                      <TableCell>{service.part.description}</TableCell>
                      <TableCell>{service.quantity}</TableCell>
                      <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        ))}

        <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Resumo</h3>
          <p className="mt-2 text-gray-700">
            Total de Mão de Obra: R$ {totalLabor.toFixed(2)}
          </p>
          <p className="mt-2 text-gray-700">
            Total de Peças: R$ {totalParts.toFixed(2)}
          </p>
          <p className="mt-2 text-gray-700 text-2xl font-bold flex justify-end">
            Total: R$ {(totalLabor + totalParts).toFixed(2)}
          </p>
        </div>

        <div className="flex justify-center mt-6 gap-[50px] print:hidden mb-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/listaServicos")}
          >
            Voltar
          </Button>
          <Button type="button" onClick={handlePrint}>
            Imprimir
          </Button>
        </div>
      </div>

      {/* Componente que só aparece na hora da impressão */}
      <div className="hidden print:block">
        <ServiceOrderPrint data={data} total={totalLabor + totalParts} />
      </div>
    </div>
  );
}

