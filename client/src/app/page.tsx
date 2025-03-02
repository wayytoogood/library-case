'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import type { User } from '@/types';
import UsersGrid from '@/components/UsersGrid';
import UserDetailsModal from '@/components/UserDetailsModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ToastMessage } from '@/components/ToastMessage';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);

    const res = await axios('http://localhost:3000/users');

    setUsers(res.data.items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleReturnBook = async (
    userId: number,
    bookId: number,
    score: string
  ) => {
    try {
      await axios.post(
        `http://localhost:3000/users/${userId}/return/${bookId}`,
        { score: parseFloat(score) }
      );
      await fetchUsers();
      setIsUserModalOpen(false);
      setToastMessage('Book returned successfully');
    } catch (error: unknown) {
      setToastMessage(
        ((error as AxiosError).response?.data as { message: string }).message
      );
    } finally {
      setTimeout(() => {
        setToastMessage('');
      }, 3000);
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Library Management System</h1>

      <div className='mb-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold'>Users</h2>
          <a
            href='/books'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          >
            View Books
          </a>
        </div>
        <UsersGrid users={users} onUserClick={handleUserClick} />
      </div>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onReturnBook={handleReturnBook}
        />
      )}
      {toastMessage && <ToastMessage message={toastMessage}></ToastMessage>}
    </main>
  );
}
