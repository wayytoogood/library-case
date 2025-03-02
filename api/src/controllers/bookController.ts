import { Request, Response } from 'express';
import prisma from '../services/prisma';
import { getBookDto } from '../helpers/getBookDto';
import { NotFoundError } from '../errors/notFoundError';

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany({
    include: { owner: true, borrowHistory: { include: { book: true } } },
  });

  const booksDto = books.map((book) => getBookDto(book));

  res.json({ items: booksDto, count: books.length });
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId = Number(req.params.id);

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { owner: true, borrowHistory: { include: { book: true } } },
  });

  if (!book) {
    throw new NotFoundError('Book not found');
  }

  res.status(200).json(getBookDto(book));
};
