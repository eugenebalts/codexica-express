import { STATUS_CODES } from 'http';

class UsersController {
  #users;

  constructor() {
    this.#users = [];

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async getAll(req, res) {
    try {
      const users = this.#users;

      res.json({
        users,
      });
    } catch (err) {
      res.status(500).json({message: err.message ?? STATUS_CODES['500']})
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = this.#users.find((user) => Number(user.id) == Number(id));

      if (user) {
        return res.json(user);
      }

      res.status(404).json({message: STATUS_CODES['404']});
    } catch (err) {
      res.status(500).json({message: err.message ?? STATUS_CODES['500']})
    }
  }

  async createUser(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(403).json({message: STATUS_CODES['403']});
      }

      if (this.#users.find((user) => user.email === email)) {
        return res.status(409).json({message: 'User with this email already exists'});
      }

      const id = this.#users.length ? Math.max(...this.#users.map(user => user.id)) + 1 : 1;


      const user = {
        email,
        id: id,
        order_ids: [],
        created_at: new Date(),
      }

      this.#users.push(user);

      res.status(400).json(user);
    } catch (err) {
      res.status(500).json({message: err.message ?? STATUS_CODES['500']})
    }
  }
}

export default new UsersController();