import Order from "../controller/orders.controller.js";

const orderRoute = async (fastify, options) => {
  const db = new Order();

  fastify.get("/order", async (request, reply) => {
    try {
      const orders = await db.list();
      reply.code(200).send(orders);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.post("/order", async (request, reply) => {
    try {
      const order = request.body;
      const response = await db.create(order);
      console.log(response);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/orderStatus/:id_company", async (request, reply) => {
    const id_company = request.params.id_company;

    try {
      const response = await db.getOrderStatus(id_company);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/orderDelivery/:id_delivery", async (request, reply) => {
    const id_delivery = request.params.id_delivery;

    try {
      const response = await db.getOrderDelivery(id_delivery);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });
};

export default orderRoute;
