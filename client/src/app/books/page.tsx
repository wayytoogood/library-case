'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import type { Book, User } from '@/types';
import BooksGrid from '@/components/BooksGrid';
import BookDetailsModal from '@/components/BookDetailsModal';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ToastMessage } from '@/components/ToastMessage';

export default function BooksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchData = async () => {
    setIsLoading(true);

    const [booksResponse, usersResponse] = await Promise.all([
      axios('http://localhost:3000/books'),
      axios('http://localhost:3000/users'),
    ]);

    setBooks(booksResponse.data.items);
    setUsers(usersResponse.data.items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const handleLendBook = async (bookId: number, userId: number) => {
    try {
      await axios.post(
        `http://localhost:3000/users/${userId}/borrow/${bookId}`
      );
      await fetchData();
      setIsBookModalOpen(false);
      setToastMessage('Book landed the user successfully');
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
          <h2 className='text-2xl font-semibold'>Books</h2>
          <Link
            href='/'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          >
            View Users
          </Link>
        </div>
        <BooksGrid books={books} onBookClick={handleBookClick} />
      </div>

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
          users={users}
          onLendBook={handleLendBook}
        />
      )}
      {toastMessage && <ToastMessage message={toastMessage}></ToastMessage>}
    </main>
  );
}
