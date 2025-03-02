import { Request, Response } from 'express-serve-static-core';
import prisma from '../services/prisma';
import { getUserDto } from '../helpers/getUserDto';
import { NotFoundError } from '../errors/notFoundError';
import { BadRequestError } from '../errors/badRequestError';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { books: true, borrowHistory: { include: { book: true } } },
  });

  const usersDto = users.map((user) => getUserDto(user));

  res.json({ items: usersDto, count: users.length });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    include: { books: true, borrowHistory: { include: { book: true } } },
    where: { id: userId },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  res.status(200).json(getUserDto(user));
};

export const returnBook = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  const rating = parseFloat(req.body.score);

  if (!userId || !bookId || !rating || rating < 1 || rating > 5) {
    throw new BadRequestError('Missing userId or bookId or invalid rating!');
  }

  const bookOwnerId = await prisma.book
    .findUnique({ where: { id: bookId } })
    .then((book) => book?.ownerId);

  if (bookOwnerId !== userId) {
    throw new BadRequestError('Bookowner does not match user!');
  }

  await prisma.book.update({
    where: { id: bookId },
    data: { owner: { disconnect: true } },
  });
  const updatedHistory = await prisma.borrowHistory.create({
    data: { userId, bookId, rating },
  });

  res.status(200).json({ updatedHistory });
};

export const borrowBook = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);

  if (!userId || !bookId) {
    throw new BadRequestError('Missing userId or bookId!');
  }

  const bookOwnerId = await prisma.book
    .findUnique({ where: { id: bookId } })
    .then((book) => book?.ownerId);

  if (bookOwnerId) {
    throw new BadRequestError('Book is already owned by somebody else!');
  }

  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: { ownerId: userId },
  });

  res.status(200).json({ updatedBook });
};
