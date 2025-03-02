export type Book = {
  id: number;
  name: string;
  author: string;
  description: string;
  year: string;
  owner: User | null;
  ownerId: number | null;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  averageRating?: number;
};

export type User = {
  id: number;
  name: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  ownedBooks: Book[];
  returnedBooks: Book[];
};
