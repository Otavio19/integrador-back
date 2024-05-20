const fastify = require("fastify");
const User = require("../controller/user.controller.js");

const UserRoute = async (fastify, options) => {
  const db = new User();

  fastify.get("/user", async (request, reply) => {
    try {
      const users = await db.list();

      reply.code(200).send(users);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/user/:id", async (request, reply) => {
    const id = request.params.id;
    try {
      const response = await db.getById(id);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/user/company/:id", async (request, reply) => {
    const id = request.params.id;

    try {
      const response = await db.getByCompany(id);

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.put("/user/:id", async (request, reply) => {
    const id = request.params.id;
    const user = request.body;

    try {
      const response = await db.update(id, user);

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });
};

module.exports = UserRoute;
