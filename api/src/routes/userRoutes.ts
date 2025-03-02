import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  borrowBook,
  returnBook,
} from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/:userId/borrow/:bookId', borrowBook);
router.post('/:userId/return/:bookId', returnBook);

export default router;
