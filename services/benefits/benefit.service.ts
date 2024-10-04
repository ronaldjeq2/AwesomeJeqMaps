import { apiClient } from "../../api/apiClient";
import { Benefit } from "./benefit.model";

export const getBenefits = async (): Promise<Benefit[]> => {
  try {
    const {data} = await apiClient.get('/benefits');
    console.log({data})
    return data.payload.benefits;
  } catch (error) {
    console.error('Error al obtener los beneficios:', {error});
    throw error;
  }
};
