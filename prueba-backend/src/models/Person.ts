import { Movie } from './Movie';

export interface Person {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  tieneSeguro: boolean;
  peliculasFavoritas: Movie[];
}
