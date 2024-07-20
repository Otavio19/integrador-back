const Category = require("../controller/category.controller");

const categoryRoute = async (fastify, options) => {
  const db = new Category();

  fastify.post("/category", async (request, reply) => {
    try {
      const category = request.body;
      const result = await db.create(category);
      reply.code(200).send(result);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/category/company/:id_company", async (request, reply) => {
    const id_company = request.params.id_company;

    try {
      const category = await db.getByCompany(id_company);
      reply.code(200).send(category);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/category/products/:id_category", async (request, reply) => {
    const id_category = request.params.id_category;

    try {
      const productsByCategory = await db.getProductsByCategory(id_category);

      reply.code(200).send(productsByCategory);
    } catch (err) {
      reply.code(500).send(err);
    }
  });

  fastify.put("/category/:id", async (request, reply) => {
    const id = request.params.id;
    const category = request.body;

    try {
      await db.update(id, category);
      reply.code(200).send({ message: "Categoria Atualizada" });
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/category/:id", async (request, reply) => {
    const id = request.params.id;

    try {
      const response = await db.getById(id);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/category/ecommerce/:id_company", async (request, reply) => {
    const id_company = request.params.id_company;

    try {
      const response = await db.getCategoryEcommerce(id_company);
      reply.code(200).send(response);
    } catch (err) {
      reply.code(500).send({ message: error });
    }
  });
};

module.exports = categoryRoute;
