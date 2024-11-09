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

  async getOrderStatus(id_company) {
    const result = await sql`SELECT 
  CASE 
    WHEN status = 'invoiced' THEN 'Faturado'
    WHEN status = 'pending' THEN 'Pendente'
    ELSE status
  END AS status,
  COUNT(*) AS total,
  SUM(price) AS total_price
FROM orders 
WHERE id_company = ${id_company}
GROUP BY 
  CASE 
    WHEN status = 'invoiced' THEN 'Faturado'
    WHEN status = 'pending' THEN 'Pendente'
    ELSE status
  END;
`;

    return result;
  }

  async getOrderDelivery(id_delivery){
    const result = await sql`
    SELECT  o.id, o.id_client, o.price, o.status, o.created_at, client.name as cliente, c.name as Empresa
    from orders o 
    inner join company c ON o.id_company = c.id
    inner join client ON o.id_client = client.id
    WHERE id_delivery = ${id_delivery}`;

    return result
  }
}

module.exports = Order;
