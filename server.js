/* const fastify = require("fastify")();
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

await fastify.register(require('@fastify/swagger'))
await fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})


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
*/

import fastify from "fastify";
import cors from "@fastify/cors";
import productRoute from "./src/routes/ProductRoute.js";
import companyRoute from "./src/routes/CompanyRoute.js";
import UserRoute from "./src/routes/UsersRoute.js";
import clientRoute from "./src/routes/ClientRoute.js";
import AuthRoute from "./src/routes/AuthRoute.js";
import orderRoute from "./src/routes/OrderRoute.js";
import OrderProductRoute from "./src/routes/OrderProductRoute.js";
import categoryRoute from "./src/routes/CategoryRoute.js";

// Inicializando o Fastify
const app = fastify();

app.register(cors, {
  origin: "*",
});

await app.register(import('@fastify/swagger'));
await app.register(import('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
});

app.register(productRoute);
app.register(companyRoute);
app.register(UserRoute);
app.register(clientRoute);
app.register(AuthRoute);
app.register(orderRoute);
app.register(OrderProductRoute);
app.register(categoryRoute);

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
