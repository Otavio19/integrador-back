const { randomUUID } = require("crypto");
const sql = require("../../db.js");

class Category {
  async create(category) {
    const categoryId = randomUUID();
    const { name, id_company, active = true } = category;

    const response =
      await sql`INSERT INTO category(id, name,id_company, active) VALUES(${categoryId},${name},${id_company}, ${active})`;

    return response;
  }

  async getByCompany(id_company) {
    const response =
      await sql`SELECT * FROM category WHERE id_company = ${id_company}`;

    return response;
  }

  async getProductsByCategory(id_category) {
    const categoryQuery =
      await sql`SELECT * FROM category WHERE id = ${id_category}`;
    const category = categoryQuery[0]; // Pegando o primeiro resultado, se houver

    const productsQuery =
      await sql`SELECT product.*, category.name AS category_name 
                                    FROM product 
                                    INNER JOIN category ON category.id = product.id_category 
                                    WHERE product.id_category = ${id_category}`;
    const products = productsQuery; // Não precisamos de [0] aqui, pois queremos todos os produtos

    return { category, products };
  }

  async update(id, category) {
    const { name, active } = category;
    const response = await sql`UPDATE category SET 
                      name = ${name},
                      active = ${active} 
                      WHERE id = ${id}`;

    return response;
  }

  async getById(id) {
    const response = await sql`SELECT * FROM category WHERE id = ${id}`;

    return response[0];
  }

  async getCategoryEcommerce(id_company) {
    try {
      const categories = await sql`
        SELECT id, name, active, id_company, ecommerce
        FROM category
        WHERE id_company = ${id_company} AND ecommerce = true
      `;

      for (let category of categories) {
        const products = await sql`
          SELECT *
          FROM product
          WHERE id_category = ${category.id}
        `;
        category.products = products;
      }

      return categories;
    } catch (error) {
      console.error("Error fetching category ecommerce:", error);
      throw error;
    }
  }
}

module.exports = Category;
