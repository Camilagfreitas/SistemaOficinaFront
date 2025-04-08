export const translateStatus = (status: string): string => {
  switch (status) {
    case "OPENED":
      return "Aberta";
    case "IN_PROGRESS":
      return "Em andamento";
    case "BLOCKED":
      return "Bloqueada";
    case "CLOSED":
      return "Fechada";
    default:
      return status;
  }
};
