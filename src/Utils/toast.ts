import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface CustomErrorToastOptions {
  message: string;
  description?: string;
  statusCode?: number;
}

export function customToast(message: string, type: string) {
  switch (type) {
    case "success":
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case "error":
      toast.error(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case "deposit":
      toast.info(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case "colect":
      toast.info(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case "status.online":
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case "status.offline":
      toast.error(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case "exceeded":
      toast.error(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case "exceeded.banknotes":
      toast.error(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    default:
      break;
  }
}

export function customErrorToast({
  message,
  description,
  statusCode,
}: CustomErrorToastOptions) {
  if (!description)
    if (statusCode)
      switch (statusCode) {
        case 401:
          description = "erro de permissão";
          break;
        case 404:
          description = "recurso não encontrado";
          break;
        case 409:
          description = "recurso já existente.";
          break;
        case 500:
          description = "erro interno do servidor.";
          break;
        default:
          description = "erro inesperado.";
          break;
      }
    else description = "falha na comunicação com servidor";

  customToast(`${message}: ${description}`, "error");
}
