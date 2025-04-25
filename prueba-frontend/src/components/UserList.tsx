// src/components/UserList.tsx
import { User } from '../types/User';
import UserItem from './UserItem';

interface Props {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
}

const UserList = ({ users, onDelete, onEdit }: Props) => {
  return (
    <ul>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default UserList;
