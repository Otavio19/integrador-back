const fastify = require("fastify")();
const cors = require("@fastify/cors");
const productRoute = require("./src/routes/ProductRoute.js");
const companyRoute = require("./src/routes/CompanyRoute.js");
const UserRoute = require("./src/routes/UsersRoute.js");
const clientRoute = require("./src/routes/ClientRoute.js");
const AuthRoute = require("./src/routes/AuthRoute.js");

fastify.register(cors, {
  origin: "*",
});

fastify.register(productRoute);
fastify.register(companyRoute);
fastify.register(UserRoute);
fastify.register(clientRoute);
fastify.register(AuthRoute);

const start = async () => {
  try {
    await fastify.listen({
      port: 3333,
    });
    console.log("Servidor está rodando na porta 3333");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
