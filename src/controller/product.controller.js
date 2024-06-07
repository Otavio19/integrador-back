const { randomUUID } = require("crypto");
const sql = require("../../db.js");

class Product {
  async list() {
    let product;

    product = await sql`select* from product`;

    return product;
  }

  async create(product) {
    let idProduct = randomUUID();

    const { amount, description, name, price, id_company, img, active } =
      product;

    await sql`INSERT INTO product(id,amount, description, name, price, id_company, img, active) 
              values (${idProduct},${amount},${description},${name},${price},${id_company},${img}, ${active})`;
  }

  async getById(id) {
    let product = await sql`SELECT * FROM product WHERE id = ${id}`;

    return product;
  }

  async getByCompany(id_company) {
    let products =
      await sql`SELECT * FROM product WHERE id_company =${id_company}`;

    return products;
  }

  async update(id, product) {
    const { name, amount, price, description, active } = product;
    const update = await sql`UPDATE product
    SET 
    name = ${name},
    price = ${price},
    amount = ${amount},
    description = ${description},
    active = ${active}
    WHERE id = ${id}`;

    return update;
  }
}

module.exports = Product;
