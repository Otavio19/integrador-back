const fastify = require("fastify")();
const cors = require("@fastify/cors");
const productRoute = require("./src/routes/ProductRoute.js");
const companyRoute = require("./src/routes/CompanyRoute.js");
const UserRoute = require("./src/routes/UsersRoute.js");
const clientRoute = require("./src/routes/ClientRoute.js");
const AuthRoute = require("./src/routes/AuthRoute.js");
const orderRoute = require("./src/routes/OrderRoute.js");
const OrderProductRoute = require("./src/routes/OrderProductRoute.js");
const categoryRoute = require("./src/routes/CategoryRoute.js");

fastify.register(cors, {
  origin: "*",
});

fastify.register(productRoute);
fastify.register(companyRoute);
fastify.register(UserRoute);
fastify.register(clientRoute);
fastify.register(AuthRoute);
fastify.register(orderRoute);
fastify.register(OrderProductRoute);
fastify.register(categoryRoute);

fastify.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
