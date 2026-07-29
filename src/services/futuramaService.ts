/* CAPA: SERVICIOS: Obtiene la URL base de la API desde las variables de entorno.*/
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_FUTURAMA_API;
import { Character } from '../model/Character';
/* Configuración de la instancia de Axios para realizar las peticiones HTTP a la API.*/
const api = axios.create({
    baseURL: API_BASE_URL
});

/* Función encargada de consumir el endpoint de personajes. 
Envía los parámetros requeridos por el examen y retorna únicamente el arreglo*/
export const getCharacters = async (): Promise<Character[]> => {
    const response = await api.get("/characters", {
        params: {
            orderBy: "id",
            orderByDirection: "asc",
            page: 1,
            size: 50
        }
    });
    return response.data.items;
};