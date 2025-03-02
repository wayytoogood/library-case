import type { User } from '@/types';

interface UsersGridProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export default function UsersGrid({ users, onUserClick }: UsersGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {users.map((user) => (
        <div
          key={user.id}
          className='bg-white p-4 rounded shadow hover:shadow-md cursor-pointer transition-shadow'
          onClick={() => onUserClick(user)}
        >
          <h3 className='font-semibold text-lg'>{user.fullName}</h3>
          <p className='text-gray-600'>Username: {user.name}</p>
          <p className='text-gray-600'>
            Books borrowed: {user.ownedBooks.length}
          </p>
          <p className='text-gray-600'>
            Books returned: {user.returnedBooks.length}
          </p>
        </div>
      ))}
    </div>
  );
}
