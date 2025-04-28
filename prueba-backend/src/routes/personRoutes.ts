import { Router, Request, Response } from 'express';
import { personService } from '../services/personService';

const router = Router();

// Listar todas las personas
router.get('/', (req: Request, res: Response) => {
  res.json(personService.listPersons());
});

// Buscar persona por ID
router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const person = personService.getPersonById(id);
  person ? res.json(person) : res.status(404).json({ message: 'Persona no encontrada' });
});

// Buscar persona por nombre
router.get('/nombre/:nombre', (req: Request, res: Response) => {
  const name = req.params.nombre;
  const person = personService.getPersonByName(name);
  person ? res.json(person) : res.status(404).json({ message: 'Persona no encontrada' });
});

// Crear nueva persona
router.post('/', (req: Request, res: Response) => {
  const person = personService.createPerson(req.body);
  res.status(201).json(person);
});

// Modificar persona
router.patch('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = personService.updatePerson(id, req.body);
  updated ? res.json(updated) : res.status(404).json({ message: 'Persona no encontrada' });
});

// Eliminar persona
router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = personService.deletePerson(id);
  deleted ? res.status(204).send() : res.status(404).json({ message: 'Persona no encontrada' });
});

// Mostrar películas de una persona
router.get('/:id/peliculas', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const movies = personService.listMoviesOfPerson(id);
  movies ? res.json(movies) : res.status(404).json({ message: 'Persona no encontrada' });
});

// Agregar película a una persona
router.post('/:id/peliculas', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const movies = personService.addMovieToPerson(id, req.body);
    movies ? res.status(201).json(movies) : res.status(404).json({ message: 'Persona no encontrada' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Quitar película de una persona
router.delete('/:id/peliculas/:titulo', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const titulo = req.params.titulo;
  const movies = personService.removeMovieFromPerson(id, titulo);
  movies ? res.status(204).send() : res.status(404).json({ message: 'Persona no encontrada' });
});

export default router;
