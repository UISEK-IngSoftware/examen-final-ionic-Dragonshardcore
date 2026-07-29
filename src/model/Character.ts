/* Modelo de datos que representa la estructura de un personaje recibido 
desde la API de Futurama.*/
export interface Character {
    id: number;
    name: string;
    gender: string;
    status: string;
    species: string;
    image: string;
}