// src/App.tsx
import { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './services/userService';
import { User } from './types/User';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreate = async (user: Partial<User>) => {
    const newUser = await createUser(user);
    setUsers(prev => [...prev, newUser]);
  };

  const handleUpdate = async (user: Partial<User>) => {
    if (!user.id) return;
    const updatedUser = await updateUser(user.id, user);
    setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    setEditingUser(null);
  };
  

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Usuarios</h1>
      <UserForm onSubmit={editingUser ? handleUpdate : handleCreate} user={editingUser} />
      <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;
