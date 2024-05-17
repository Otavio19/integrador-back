const User = require("../controller/user.controller.js");

const UserRoute = async (fastify, options) => {
  const db = new User();

  fastify.post("/register", async (request, reply) => {
    let user = await request.body;
    let result = await db.register(user);
    reply.code(201).send(result);
  });

  fastify.post("/login", async (request, reply) => {
    let user = request.body;

    let result = await db.login(user);
    if (!result) {
      reply.code(500).send({ message: "Usuário não encontrado" });
    }
    reply.code(200).send(result);
  });
};

module.exports = UserRoute;
