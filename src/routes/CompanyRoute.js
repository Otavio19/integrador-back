const Company = require("../controller/company.controller.js");

const companyRoute = async (fastify, options) => {
  const db = new Company();

  fastify.get("/company", async (request, reply) => {
    const companies = await db.list();

    return companies;
  });

  fastify.post("/company", async (request, reply) => {
    try {
      companyData = request.body;
      const result = await db.create(companyData);
      reply.code(201).send(result);
    } catch (error) {
      reply
        .code(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  });

  fastify.get("/company/:id", async (request, reply) => {
    try {
      const idCompany = request.params.id;
      const result = await db.getById(idCompany);
      reply.code(201).send(result);
    } catch (error) {
      reply
        .code(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  });

  fastify.put("/company/:id", async (request, reply) => {
    const id = request.params.id;
    const company = request.body;

    try {
      const response = await db.update(id, company);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/company/validate/:id", async (request, reply) => {
    const id = request.params.id;

    try {
      const response = await db.validateId(id);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });
};

module.exports = companyRoute;
