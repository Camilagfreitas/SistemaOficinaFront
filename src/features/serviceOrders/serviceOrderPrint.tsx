import { IServiceOrderDetails } from "@/types/ApiResponse/IGetServiceOrderDetailsResponse";

interface Props {
  data: IServiceOrderDetails;
  total: number;
}

export default function ServiceOrderPrint({ data, total }: Props) {
  const creationDate = data.createdAt ? new Date(data.createdAt) : new Date();

  return (
    <div className="print-only  text-black text-sm">
      <p className="text-end">
        <strong>Data:</strong> {creationDate.toLocaleDateString("pt-br")}
      </p>
      <h2 className=" text-neutral-800 text-[26px]">
        Auto <span className="font-semibold">Elite</span>
      </h2>
      <h2 className="text-xl font-bold mb-4 text-center mt-4">
        Ordem de Serviço
      </h2>

      {/* Cliente e Mecânico lado a lado */}
      <div className="flex justify-between mt-4">
        <p>
          <strong>Cliente:</strong> {data.vehicle.customer.name}{" "}
          {data.vehicle.customer.lastname}
        </p>
        <p>
          <strong>Mecânico:</strong> {data.user.name}
        </p>
      </div>

      <p className="mt-4 font-semibold">Informações do Veículo:</p>
      <p>
        <strong>Placa:</strong> {data.vehicle.plate}
      </p>
      <p>
        <strong>Modelo:</strong> {data.vehicle.model}
      </p>
      <p>
        <strong>Kilometragem:</strong> {data.vehicle.mileage} KM
      </p>

      <p className="font-semibold mt-6">Detalhes do Serviço:</p>
      {data.services.map((service, i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold mt-2">Serviço: {service.category.name}</p>

          {service.details.map((detail, j) => {
            const isLabor = detail.part?.code === "1";

            return (
              <div
                key={j}
                className="pl-4 flex justify-between border-b border-gray-300 py-1"
              >
                <p className="w-1/3">
                  {isLabor
                    ? detail.part?.description
                    : `${detail.part?.code} ${
                        detail.part?.description || "—"
                      }`}
                </p>
                {!isLabor && (
                  <p className="w-1/3 text-center">
                    Quantidade: {detail.quantity}
                  </p>
                )}
                <p className="w-1/3 text-end">
                  Valor: R$ {detail.price.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      ))}

      <p className="text-xl mt-6">
        <strong>Total:</strong> R$ {total.toFixed(2)}
      </p>
    </div>
  );
}
