const { randomUUID } = require("crypto");
const sql = require("../../db.js");

class Client {
  async list() {
    let clients;

    clients = await sql`SELECT * FROM client`;

    return clients;
  }

  async getById(id) {
    const client = await sql`SELECT * FROM client WHERE id = ${id}`;

    return client;
  }

  async getByCompany(id_company) {
    const client =
      await sql`SELECT * FROM client WHERE id_company = ${id_company}`;

    return client;
  }

  async create(client) {
    const clientId = randomUUID();

    const { name, email, password, id_seller, id_company } = client;

    await sql`INSERT INTO client(id, name, email, password, id_seller, id_company) VALUES (${clientId}, ${name}, ${email}, ${password}, ${id_seller}, ${id_company})`;
  }

  async update(id, client) {
    const { name, email, password, active } = client;

    const cliente = await sql`
    UPDATE client SET
    name = ${name},
    email = ${email},
    password = ${password},
    active = ${active}
    WHERE id = ${id}`;

    return cliente;
  }
}

module.exports = Client;
