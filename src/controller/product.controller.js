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

    const {
      amount,
      description,
      name,
      price,
      id_company,
      img,
      active,
      id_category,
    } = product;

    await sql`INSERT INTO 
              product(id,amount, description, name, price, id_company, img, active, id_category) 
              values 
              (${idProduct},${amount},${description},${name},${price},${id_company},${img}, ${active}, ${id_category})`;

    return { message: "Produto cadastrado com sucesso!" };
  }

  async getById(id) {
    let product = await sql`select product.*, category.name AS category
                            FROM product
                            INNER JOIN category ON category.id = product.id_category 
                            WHERE product.id = ${id}`;

    return product[0];
  }

  async getByCompany(id_company) {
    let products = await sql`select product.*, category.name AS category
FROM product
INNER JOIN category ON category.id = product.id_category
WHERE product.id_company = ${id_company}`;

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

    return { message: "Produto Editado!" };
  }
}

module.exports = Product;
