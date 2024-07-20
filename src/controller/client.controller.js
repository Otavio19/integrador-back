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

    return client[0];
  }

  async getByCompany(id_company) {
    const client =
      await sql`SELECT client.id, client.id_company, client.name AS client_name, client.email, users.name AS seller_name, client.active
      FROM users
      INNER JOIN client ON client.id_seller = users.id
      WHERE client.id_company = ${id_company}`;
    return client;
  }

  async create(client) {
    const clientId = randomUUID();

    const { name, email, password, id_seller, id_company, active, cpf, phone } =
      client;

    const response =
      await sql`INSERT INTO client(id, name, email, password, id_seller, id_company, active, cpf, phone) VALUES (${clientId}, ${name}, ${email}, ${password}, ${id_seller}, ${id_company}, ${active}, ${cpf}, ${phone})`;

    return response;
  }

  async update(id, client) {
    const { name, email, password, active, cpf, phone } = client;

    const cliente = await sql`
    UPDATE client SET
    name = ${name},
    email = ${email},
    password = ${password},
    active = ${active},
    cpf = ${cpf},
    phone = ${phone}
    WHERE id = ${id}`;

    return cliente;
  }
}

module.exports = Client;
