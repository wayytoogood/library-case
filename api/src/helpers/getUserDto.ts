import type { User, Book, BorrowHistory } from '@prisma/client';

export type HistoryWithBook = BorrowHistory & { book: Book };
export type UserWithBookInfo = User & {
  books: Book[];
  borrowHistory: HistoryWithBook[];
};

export const getUserDto = (user: UserWithBookInfo) => {
  const { borrowHistory, books, ...userWithoutHistory } = user;
  return {
    ...userWithoutHistory,
    ownedBooks: books,
    returnedBooks: user.borrowHistory.map((history) => ({
      ...history.book,
      rating: history.rating,
    })),
  };
};
