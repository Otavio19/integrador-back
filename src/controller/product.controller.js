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

    const { amount, description, name, price, id_company } = product;

    await sql`INSERT INTO product(id,amount, description, name, price, id_company) values (${idProduct},${amount},${description},${name},${price},${id_company})`;
  }

  async getByCompany(id_company) {
    let products =
      await sql`SELECT * FROM product WHERE id_company =${id_company}`;

    return products;
  }
}

module.exports = Product;
