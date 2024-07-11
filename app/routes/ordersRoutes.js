import { Router } from 'express';
import ordersController from '../controllers/ordersController.js';

const ordersRouter = new Router();

ordersRouter.get('/', ordersController.getAll);
ordersRouter.get('/:id', ordersController.getById);
ordersRouter.post('/', ordersController.createOrder);

export default ordersRouter;