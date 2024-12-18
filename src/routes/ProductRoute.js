import Product from "../controller/product.controller.js";
import User from "../controller/user.controller.js";
import jwt from "jsonwebtoken";

const productRoute = async (fastify, options) => {
  const db = new Product();
  const dbUser = new User();

  fastify.get("/product", async (request, reply) => {
    try {
      const products = await db.list();
      reply.code(200).send(products);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.post("/product", async (request, reply) => {
    try {
      const authorizationHeader = request.headers.authorization;
      let token = authorizationHeader;
      let product = request.body;
      console.log("produto: " + product);

      if (!token || token === undefined) {
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
      reply.code(200).send(result);
    } catch (error) {
      console.error("Error:", error);
      reply
        .code(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  });

  fastify.get("/product/:id", async (request, reply) => {
    try {
      const id = request.params.id;
      const product = await db.getById(id);
      reply.code(200).send(product);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/product/company/:id", async (request, reply) => {
    try {
      const companyId = request.params.id;
      const products = await db.getByCompany(companyId);
      reply.code(200).send(products);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.put("/product/:id", async (request, reply) => {
    const product = request.body;
    const id = request.params.id;

    try {
      await db.update(id, product);
      reply.code(200).send({ message: "Produto Editado com Sucesso!" });
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });
};

export default productRoute;
