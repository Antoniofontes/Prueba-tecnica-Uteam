// src/services/personService.ts
import { Person } from "../models/Person";
import { Movie } from "../models/Movie";
import { MAX_PELICULAS_POR_PERSONA } from "../config/settings";

let persons: Person[] = []; // Aquí guardamos las personas en memoria
let nextId = 1; // Para autogenerar IDs

export const personService = {
  listPersons: (): Person[] => {
    return persons.sort((a, b) => {
      if (a.apellido === b.apellido) {
        return a.nombre.localeCompare(b.nombre);
      }
      return a.apellido.localeCompare(b.apellido);
    });
  },

  getPersonById: (id: number): Person | undefined => {
    return persons.find(p => p.id === id);
  },

  getPersonByName: (name: string): Person | undefined => {
    return persons.find(p => p.nombre.toLowerCase() === name.toLowerCase());
  },

  createPerson: (personData: Omit<Person, 'id' | 'peliculasFavoritas'>): Person => {
    const newPerson: Person = {
      id: nextId++,
      ...personData,
      peliculasFavoritas: [],
    };
    persons.push(newPerson);
    return newPerson;
  },

  updatePerson: (id: number, updateData: Partial<Person>): Person | undefined => {
    const person = persons.find(p => p.id === id);
    if (!person) return undefined;

    Object.assign(person, updateData);
    return person;
  },

  deletePerson: (id: number): boolean => {
    const originalLength = persons.length;
    persons = persons.filter(p => p.id !== id);
    return persons.length < originalLength;
  },

  listMoviesOfPerson: (id: number): Movie[] | undefined => {
    const person = persons.find(p => p.id === id);
    return person?.peliculasFavoritas;
  },

  addMovieToPerson: (id: number, movie: Movie): Movie[] | undefined => {
    const person = persons.find(p => p.id === id);
    if (!person) return undefined;
    if (person.peliculasFavoritas.length >= MAX_PELICULAS_POR_PERSONA) {
      throw new Error('Número máximo de películas alcanzado.');
    }
    person.peliculasFavoritas.push(movie);
    return person.peliculasFavoritas;
  },

  removeMovieFromPerson: (id: number, titulo: string): Movie[] | undefined => {
    const person = persons.find(p => p.id === id);
    if (!person) return undefined;
    person.peliculasFavoritas = person.peliculasFavoritas.filter(m => m.titulo !== titulo);
    return person.peliculasFavoritas;
  }
};
