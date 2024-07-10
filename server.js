import express from 'express';

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
      res.json('Hello devs');
    })
  }
}

export default new Server();