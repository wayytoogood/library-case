import { Fragment, useState } from 'react';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from '@headlessui/react';
import type { Book, User } from '@/types';
import { format, getYear } from 'date-fns';

interface BookDetailsModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onLendBook: (bookId: number, userId: number) => void;
}

export default function BookDetailsModal({
  book,
  isOpen,
  onClose,
  users,
  onLendBook,
}: BookDetailsModalProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');

  const handleLend = () => {
    if (selectedUserId !== '') {
      onLendBook(book.id, Number(selectedUserId));
      setSelectedUserId('');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40 bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'
                >
                  Book Details: {book.name}
                </DialogTitle>

                <div className='mt-4 space-y-2'>
                  <p>
                    <span className='font-semibold'>Author:</span> {book.author}
                  </p>
                  <p>
                    <span className='font-semibold'>Year:</span>{' '}
                    {getYear(book.year)}
                  </p>
                  <p>
                    <span className='font-semibold'>Description:</span>{' '}
                    {book.description}
                  </p>
                  <p>
                    <span className='font-semibold'>Added to library:</span>{' '}
                    {format(new Date(book.createdAt), 'PPP')}
                  </p>

                  <div className='flex items-center'>
                    <span className='font-semibold mr-2'>Average Rating:</span>
                    <div className='flex'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(book.averageRating || 0)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                      ))}
                    </div>
                    <span className='ml-2 text-sm text-gray-600'>
                      ({book.averageRating?.toFixed(1) || 'N/A'})
                    </span>
                  </div>

                  <p>
                    <span className='font-semibold'>Current Status:</span>{' '}
                    {book.owner ? (
                      <span className='text-red-500'>
                        Borrowed by {book.owner.fullName}
                      </span>
                    ) : (
                      <span className='text-green-500'>Available</span>
                    )}
                  </p>
                </div>

                {!book.owner && (
                  <div className='mt-6'>
                    <h4 className='font-semibold mb-2'>Lend this book</h4>
                    <div className='flex space-x-2'>
                      <select
                        value={selectedUserId}
                        onChange={(e) =>
                          setSelectedUserId(
                            e.target.value ? Number(e.target.value) : ''
                          )
                        }
                        className='flex-1 rounded border border-gray-300 px-3 py-2'
                      >
                        <option value=''>Select a user</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.fullName}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleLend}
                        disabled={selectedUserId === ''}
                        className={`px-4 py-2 rounded ${
                          selectedUserId === ''
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        Lend
                      </button>
                    </div>
                  </div>
                )}

                <div className='mt-6 flex justify-end'>
                  <button
                    type='button'
                    className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded'
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
