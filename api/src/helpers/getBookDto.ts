import type { Book, User, BorrowHistory } from '@prisma/client';

export type BookWithRatings = Book & {
  borrowHistory: BorrowHistory[];
  owner?: User | null;
};

export const getBookDto = (book: BookWithRatings) => {
  const borrowCount = book.borrowHistory.length;
  const averageRating =
    borrowCount > 0
      ? book.borrowHistory.reduce((sum, curr) => sum + curr.rating, 0) /
        borrowCount
      : null;

  const { ownerId, borrowHistory, ...trimmedData } = book;

  return {
    ...trimmedData,
    averageRating,
  };
};
