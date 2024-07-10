import express from 'express';
import userRouter from './routes/userRoutes.js';
import routesList from './routes/routesList.js';

class Server {
  app = express();
  #PORT = process.env.PORT ?? 3000;

  constructor() {
    this.#configureExpressApp();
    this.#configureRoutes();

  }

  startExpressServer() {
    this.app.listen(this.#PORT, () => {
      console.log('Server has been started on PORT ', this.#PORT);
    });
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
  }
}

export default new Server();