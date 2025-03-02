import { Fragment, useRef } from 'react';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import type { User } from '@/types';
import { format, getYear } from 'date-fns';

interface UserDetailsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onReturnBook: (userId: number, bookId: number, score: string) => void;
}

export default function UserDetailsModal({
  user,
  isOpen,
  onClose,
  onReturnBook,
}: UserDetailsModalProps) {
  const scoreRef = useRef<HTMLInputElement>(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => {
          onClose();
          if (scoreRef.current) scoreRef.current.value = '5';
        }}
      >
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
              <DialogPanel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'
                >
                  User Details: {user.fullName}
                </DialogTitle>

                <div className='mt-4'>
                  <p>
                    <span className='font-semibold'>Username:</span> {user.name}
                  </p>
                  <p>
                    <span className='font-semibold'>Member since:</span>{' '}
                    {format(new Date(user.createdAt), 'PPP')}
                  </p>
                </div>

                <div className='mt-6'>
                  <h4 className='font-semibold text-lg mb-2'>
                    Currently Borrowed Books
                  </h4>
                  {user.ownedBooks.length === 0 ? (
                    <p className='text-gray-500 italic'>
                      No books currently borrowed
                    </p>
                  ) : (
                    <div className='space-y-2'>
                      {user.ownedBooks.map((book) => (
                        <div
                          key={book.id}
                          className='flex justify-between items-center p-2 bg-gray-50 rounded'
                        >
                          <div>
                            <p className='font-medium'>{book.name}</p>
                            <p className='text-sm text-gray-600'>
                              by {book.author} ({getYear(book.year)})
                            </p>
                            <div className='flex gap-2 items-center mt-1'>
                              <p className='text-sm text-gray-600'>
                                Given Rating:
                              </p>
                              <input
                                type='number'
                                min={1}
                                max={5}
                                step='.01'
                                defaultValue={5}
                                ref={scoreRef}
                                className='text-sm text-gray-700 border border-gray-300 rounded px-2 py-1 w-20'
                              ></input>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              onReturnBook(
                                user.id,
                                book.id,
                                scoreRef.current!.value
                              )
                            }
                            className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm'
                          >
                            Return Book
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className='mt-6'>
                  <h4 className='font-semibold text-lg mb-2'>
                    Previously Returned Books
                  </h4>
                  {user.returnedBooks.length === 0 ? (
                    <p className='text-gray-500 italic'>
                      No books previously returned
                    </p>
                  ) : (
                    <div className='space-y-2'>
                      {user.returnedBooks.map((book) => (
                        <div key={book.id} className='p-2 bg-gray-50 rounded'>
                          <p className='font-medium'>{book.name}</p>
                          <p className='text-sm text-gray-600'>
                            by {book.author} ({getYear(book.year)})
                          </p>
                          <div className='flex items-center mt-1'>
                            <span className='text-sm text-gray-600 mr-2'>
                              Rating:
                            </span>
                            <div className='flex'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= (book.rating || 0)
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
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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
