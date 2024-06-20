const { randomUUID } = require("crypto");
const sql = require("../../db.js");

class OrderProduct {
  async list() {
    const products = sql`SELECT * FROM order_product`;

    return products;
  }

  async getOrdersByCompany(id_company) {
    const orders =
      await sql`SELECT users.name as seller, client.name as client, orders.price, orders.id, orders.source, orders.status, orders.created_at
      FROM orders
      INNER JOIN users ON users.id = orders.id_seller
      INNER JOIN client ON client.id = orders.id_client
      WHERE orders.id_company = ${id_company}
      ORDER BY created_at DESC`;
    return orders;
  }

  async getAllByOrder(id) {
    console.log("ID do pedido", id);
    try {
      const orderInfo =
        await sql`SELECT users.name, client.name, orders.id, orders.price
                        FROM orders
                        INNER JOIN users ON users.id = orders.id_seller
                        INNER JOIN client ON client.id = orders.id_client
                        WHERE orders.id =${id}`;

      console.log("Pedido:", orderInfo);

      if (orderInfo.lenght == 0) {
        return { error: "Pedido Não Econtrado" };
      }

      const products =
        await sql`SELECT order_product.price, order_product.amount, product.name
                        FROM order_product
                        INNER JOIN product ON order_product.id_product = product.id
                        WHERE id_order=${id}`;

      const order = { info: orderInfo[0], products };
      return order;
    } catch (error) {
      return error;
    }
  }

  async addOrder(orderId, info) {
    const { id_seller, id_client, id_company, price, source, status } = info;
    const response =
      await sql`INSERT INTO orders (id, id_seller, id_company, id_client, price, source, status) 
                            VALUES (${orderId}, ${id_seller}, ${id_company}, ${id_client}, ${price}, ${source}, ${status})`;
    return response;
  }

  async addProduct(product) {
    const { id, id_order, id_product, price, amount } = product;
    const response = await sql`INSERT INTO order_product
                              (id, id_order,id_product, price, amount)
                              VALUES (${id}, ${id_order}, ${id_product}, ${price}, ${amount})`;
    return response;
  }

  async invoiceOrder(id) {
    await sql`UPDATE orders SET status='invoiced' WHERE id =${id}`;

    return { message: "Pedido Faturado com Sucesso!" };
  }

  async getOrderById(id) {
    const order = await sql`
    SELECT orders.id, users.name as seller, orders.created_at, client.name as client, orders.price, orders.source, orders.status
    FROM orders
    INNER JOIN users ON users.id = orders.id_seller
    INNER JOIN client ON client.id = orders.id_client
    WHERE orders.id = ${id};
    `;

    if (order.count === 0) {
      return null;
    }
    return order[0];
  }
}

module.exports = OrderProduct;
