const Product = require("../controller/product.controller.js");
const User = require("../controller/user.controller.js");
const jwt = require("jsonwebtoken");

const productRoute = async (fastify, options) => {
  const db = new Product();
  const dbUser = new User();

  fastify.get("/product", async (request, reply) => {
    const products = await db.list();

    return products;
  });

  fastify.post("/product", async (request, reply) => {
    try {
      const authorizationHeader = request.headers.authorization;
      let token = authorizationHeader;
      let product = request.body;
      console.log("produto" + product);

      if (!token || token == undefined) {
        return reply
          .code(401)
          .send({ error: "Unauthorized", message: "Token not provided" });
      }

      token = token.substring(7);
      const decodedToken = jwt.verify(token, "chavesecreta");

      const user = await dbUser.findUserById(decodedToken.user.id);
      product.id_company = decodedToken.user.id_company;
      if (!user) {
        return reply
          .code(404)
          .send({ error: "Not Found", message: "User not Found" });
      }

      const result = await db.create(product);
      console.log(result);
      reply.code(201).send(result);
    } catch (error) {
      console.error("Error:", error);
      reply
        .code(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  });

  fastify.get("/product/company/:id", async (request, reply) => {
    const companyId = request.params.id;

    let products = await db.getByCompany(companyId);

    return products;
  });
};

module.exports = productRoute;
