const Auth = require("../controller/auth.controller.js");

const AuthRoute = async (fastify, options) => {
  const db = new Auth();

  fastify.post("/auth/register", async (request, reply) => {
    const user = await request.body;

    try {
      const result = await db.register(user);

      reply.code(201).send(result);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.post("/auth/login", async (request, reply) => {
    const login = await request.body;

    try {
      const response = await db.login(login);

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });
};

module.exports = AuthRoute;
