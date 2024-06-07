const OrderProduct = require("../controller/order_product.controller");
const { randomUUID } = require("crypto");

const OrderProductRoute = async (fastify, options) => {
  const db = new OrderProduct();

  fastify.get("/orderProduct", async (request, reply) => {
    try {
      const products = await db.list();
      reply.code(200).send(products);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });

  fastify.get("/orderProduct/products/:idOrder", async (request, reply) => {
    const idOrder = request.params.idOrder;

    try {
      const orders = await db.getAllByOrder(idOrder);

      reply.code(200).send(orders);
    } catch (error) {
      reply.code(error).send({ message: error });
    }
  });

  fastify.post("/orderProduct", async (request, reply) => {
    const { info, products } = request.body;

    try {
      const orderId = randomUUID();
      await db.addOrder(orderId, info);

      for (const product of products) {
        product.id_order = orderId;
        product.id = randomUUID();
        await db.addProduct(product);
      }

      reply.code(200).send({ message: "Pedido salvo com sucesso." });
    } catch (error) {
      reply.code(500).send({ message: error.message });
    }
  });

  //Buscar Informações dos pedidos por Empresa:
  fastify.get("/orderProduct/:idCompany", async (request, reply) => {
    const id_company = request.params.idCompany;

    try {
      const info = await db.getOrdersByCompany(id_company);

      reply.code(200).send(info);
    } catch (error) {
      reply.code(500).send({ message: error });
    }
  });
};

module.exports = OrderProductRoute;