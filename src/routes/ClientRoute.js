import Client from "../controller/client.controller.js"; // Usando import

// Função para tratar erros e enviar resposta padronizada
const handleError = (error, reply) => {
  if (error.code === "23505") {
    // Erro de CPF duplicado
    return reply.code(400).send({ message: "CPF já existente.", type: false });
  } else {
    // Outros erros
    console.error(error); // Log para depuração
    return reply.code(500).send({ message: error.message, type: false });
  }
};

const clientRoute = async (fastify, options) => {
  const db = new Client();

  // Listar todos os clientes
  fastify.get("/client", async (request, reply) => {
    try {
      const clients = await db.list();
      return reply.code(200).send(clients);
    } catch (error) {
      handleError(error, reply);
    }
  });

  // Buscar cliente por ID
  fastify.get("/client/:id", async (request, reply) => {
    const id = request.params.id;
    try {
      const client = await db.getById(id);
      reply.code(200).send(client);
    } catch (error) {
      handleError(error, reply);
    }
  });

  // Buscar clientes por ID da empresa
  fastify.get("/client/company/:id", async (request, reply) => {
    const id = request.params.id;
    try {
      const clients = await db.getByCompany(id);
      reply.code(200).send(clients);
    } catch (error) {
      handleError(error, reply);
    }
  });

  // Cadastrar um novo cliente
  fastify.post("/client", async (request, reply) => {
    try {
      const client = request.body;
      const result = await db.create(client);
      console.log(result); // Log de sucesso para depuração
      reply.code(201).send({ message: "Cliente Cadastrado com Sucesso.", type: true });
    } catch (error) {
      handleError(error, reply);
    }
  });

  // Atualizar um cliente existente
  fastify.put("/client/:id", async (request, reply) => {
    const id = request.params.id;
    const client = request.body;
    try {
      const update = await db.update(id, client);
      reply.code(200).send(update);
    } catch (error) {
      handleError(error, reply);
    }
  });
};

export default clientRoute; // Usando export default para exportar a função
