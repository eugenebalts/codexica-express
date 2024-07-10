import { Router } from 'express';
import usersController from '../controllers/usersController.js';

const usersRouter = new Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/', usersController.createUser);

export default usersRouter;