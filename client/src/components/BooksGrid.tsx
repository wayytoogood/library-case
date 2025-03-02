import { getYear } from 'date-fns';
import type { Book } from '@/types';

interface BooksGridProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

export default function BooksGrid({ books, onBookClick }: BooksGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {books.map((book) => (
        <div
          key={book.id}
          className='bg-white p-4 rounded shadow hover:shadow-md cursor-pointer transition-shadow'
          onClick={() => onBookClick(book)}
        >
          <h3 className='font-semibold text-lg'>{book.name}</h3>
          <p className='text-gray-600'>by {book.author}</p>
          <p className='text-gray-600'>Year: {getYear(book.year)}</p>
          <p
            className={`mt-2 ${book.owner ? 'text-red-500' : 'text-green-500'}`}
          >
            {book.owner ? 'Currently borrowed' : 'Available'}
          </p>
        </div>
      ))}
    </div>
  );
}
