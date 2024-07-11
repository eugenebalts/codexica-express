import express from 'express';
import usersRouter from './routes/usersRoutes.js';
import routesList from './routes/routesList.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Server {
  app = express();
  #PORT = process.env.PORT ?? 3000;
  #DB_URL = process.env.DB_URL;

  constructor() {
    this.#configureExpressApp();
    this.#configureRoutes();
  }

  async startExpressServer() {
    try {
      await mongoose.connect(this.#DB_URL);

      this.app.listen(this.#PORT, () => {
        console.log('Server has been started on PORT ', this.#PORT);
      });

    } catch (err) {
      console.log(err);
    }
  }

  #configureExpressApp() {
    this.app.use(express.json());
  }

  #configureRoutes() {
    this.app.get('/', (req, res) => {
      res.json('Hello devs!');
    });

    this.app.get('/api', (req, res) => {
      res.json(routesList);
    });

    this.app.use('/api/users', usersRouter);
  }
}

export default new Server();