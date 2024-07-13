import express from 'express';
import usersRouter from './routes/usersRoutes.js';
import ordersRouter from './routes/ordersRoutes.js';
import routesList from './routes/routesList.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ErrorHandler from './middlewares/errorHandler.js';

dotenv.config();

class Server {
  #app = express();
  #PORT = process.env.PORT ?? 3000;
  #DB_URL = process.env.DB_URL;

  constructor() {
    this.#configureExpressApp();
    this.#configureRoutes();
  }

  async startExpressServer() {
    try {
      await mongoose.connect(this.#DB_URL);

      this.#app.listen(this.#PORT, () => {
        console.log('Server has been started on PORT ', this.#PORT);
      });
    } catch (err) {
      console.log(err);
    }
  }

  #configureExpressApp() {
    this.#app.use(express.json());
  }

  #configureRoutes() {
    this.#app.get('/', (req, res) => {
      res.json('Hello devs! Come to path /api to see all endpoints!');
    });

    this.#app.get('/api', (req, res) => {
      res.json(routesList);
    });

    this.#app.use('/api/users', usersRouter);
    this.#app.use('/api/orders', ordersRouter);

    this.#app.use(ErrorHandler);
  }
}

export default new Server();
