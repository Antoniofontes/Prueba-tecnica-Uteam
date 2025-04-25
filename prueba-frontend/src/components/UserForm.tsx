// src/components/UserForm.tsx
import { useState, useEffect } from 'react';
import { User } from '../types/User';

interface Props {
  onSubmit: (user: Partial<User> | User) => void;
  user?: User | null;
}

const UserForm = ({ onSubmit, user }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: user?.id ?? undefined,
      name,
      email,
    };
    onSubmit(newUser);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{user ? 'Actualizar' : 'Crear'} Usuario</button>
    </form>
  );
};

export default UserForm;
