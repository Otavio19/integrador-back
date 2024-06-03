const { randomUUID } = require("crypto");
const sql = require("../../db.js");

class Order {
  async list() {
    const orders = await sql`SELECT * FROM orders`;
    return orders;
  }

  async create(order) {
    const orderId = randomUUID();
    const { id_seller, id_client, id_company, price, products } = order;

    const result = await sql`INSERT INTO orders
        (id, id_seller, id_client, id_company, price)
        values(${orderId},${id_seller} ,${id_client}, ${id_company}, ${price})`;

    return result;
  }
}

module.exports = Order;
