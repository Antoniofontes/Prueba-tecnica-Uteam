// src/components/UserItem.tsx
import { User } from '../types/User';

interface Props {
  user: User;
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
}

const UserItem = ({ user, onDelete, onEdit }: Props) => {
  return (
    <li className="user-item">
  <div className="user-info">
    <strong>{user.name}</strong> - {user.email}
  </div>
  <div className="actions">
    <button onClick={() => onEdit(user)}>Editar</button>
    <button onClick={() => onDelete(user.id)}>Eliminar</button>
  </div>
</li>

  );
};

export default UserItem;
