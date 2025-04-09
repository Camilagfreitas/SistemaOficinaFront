import { IServiceOrderDetails } from "@/types/ApiResponse/IGetServiceOrderDetailsResponse";

interface Props {
  data: IServiceOrderDetails;
  total: number;
}

export default function ServiceOrderPrint({ data, total }: Props) {
  const creationDate = data.createdAt ? new Date(data.createdAt) : new Date();

  return (
    <div className="print-only text-black text-sm">
      <p className="text-end">
        <strong>Data:</strong> {creationDate.toLocaleDateString("pt-br")}
      </p>
      <h2 className="text-neutral-800 text-[36px]">
        Auto <span className="font-semibold">Elite</span>
      </h2>
      <p className="text-neutral-800 text-[8px]">
      <span className="font-semibold"> Telefone:</span> (35)3222-7964 <span className="font-semibold">CNPJ:</span> 33.655.373/0001-5O</p>
      <h2 className="text-xl font-bold mb-2 text-center mt-6">
        Ordem de Serviço
      </h2>

      <div className="flex justify-between mt-4">
        <p>
          <strong>Cliente:</strong> {data.vehicle.customer.name}{" "}
          {data.vehicle.customer.lastname}
        </p>
        <p>
          <strong>Mecânico:</strong> {data.user.name} 
        </p>
      </div>

      <p className="mt-1 font-semibold">Informações do Veículo:</p>
      <p>
        <strong>Placa:</strong> {data.vehicle.plate}
      </p>
      <p>
        <strong>Modelo:</strong> {data.vehicle.model}
      </p>
      <p>
        <strong>Kilometragem:</strong> {data.vehicle.mileage} KM
      </p>
      {data.services.map((service, i) => {
        const parts = service.details.filter(detail => detail.part?.code !== "1");
        const labor = service.details.filter(detail => detail.part?.code === "1");

        return (
          <div key={i} className="mt-4">
            <p className="font-semibold text-lg">Serviço: {service.category.name}</p>

            {parts.length > 0 && (
              <>
                 <div className="flex justify-between border-b border-gray-600 py-1 font-semibold">
      <p className="w-1/4">Quantia</p>
      <p className="w-1/4">Código</p>
      <p className="w-1/4">Descrição</p>
      <p className="w-1/4 text-end">Valor</p>
    </div>
                {parts.map((detail, j) => (
                  <div
                    key={`part-${j}`}
                    className="flex justify-between border-b border-gray-300 py-1"
                  >
                    <p className="w-1/4 ">
                      {detail.quantity}
                    </p>
                    <p className="w-1/4">
                      {detail.part?.code} 
                    </p>
                    <p className="w-1/4">
                      {detail.part?.description || "—"}
                    </p>
                    <p className="w-1/4 text-end">
                    R$ {detail.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </>
            )}

            {labor.length > 0 && (
              <>
                {labor.map((detail, j) => (
                  <div
                    key={`labor-${j}`}
                    className="pl-1 flex justify-between border-b border-gray-300 py-1"
                  >
                    <p className="w-1/2">{detail.part?.description}</p>
                    <p className="w-1/2 text-end">
                    R$ {detail.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        );
      })}

      <p className="text-xl mt-6">
        <strong>Total:</strong> R$ {total.toFixed(2)}
      </p>
    </div>
  );
}
