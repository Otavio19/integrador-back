const Client = require("../controller/client.controller");

const clientRoute = async (fastify, options) => {
  const db = new Client();

  fastify.get("/client", async (response, reply) => {
    try {
      const client = await db.list();

      return reply.code(200).send(client);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/client/:id", async (response, reply) => {
    const id = response.params.id;

    try {
      const client = await db.getById(id);

      reply.code(201).send(client);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/client/company/:id", async (response, reply) => {
    const id = response.params.id;
    try {
      const clients = await db.getByCompany(id);

      reply.code(201).send(clients);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.post("/client", async (response, reply) => {
    try {
      const client = response.body;
      const result = await db.create(client);
      console.log(result);
      reply
        .code(201)
        .send({ message: "Cliente Cadastrado com Sucesso.", type: true });
    } catch (error) {
      if (error.code === "23505") {
        reply.code(400).send({ message: "CPF já existente.", type: false });
      } else {
        reply.code(500).send({ message: error.message, type: false });
      }
    }
  });

  fastify.put("/client/:id", async (response, reply) => {
    const id = await response.params.id;
    const cliente = response.body;
    try {
      const update = db.update(id, cliente);
      reply.code(201).send(update);
    } catch (error) {
      if (error.code === "23505") {
        reply.code(400).send({ message: "CPF já existente.", type: false });
      } else {
        reply.code(500).send({ message: error.message, type: false });
      }
    }
  });
};

module.exports = clientRoute;
