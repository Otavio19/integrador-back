const { randomUUID } = require("crypto");
const sql = require("../../db.js");

class Company {
  async list() {
    let companys;

    companys = await sql`select * from company`;

    return companys;
  }

  async create(company) {
    const companyId = randomUUID();

    const { name } = company;

    await sql`insert into company(id, name) values (${companyId},${name})`;
  }

  async getById(companyId) {
    let company = await sql`SELECT * FROM company WHERE id = ${companyId}`;

    return company;
  }

  async update(id, company) {
    const { name } = company;

    const update = sql`UPDATE company SET
    name = ${name} WHERE id = ${id}`;

    return update;
  }

  async validateId(id) {
    const company = await sql`SELECT * FROM company WHERE id = ${id}`;

    if (company.length > 0) {
      return company;
    }
    return null;
  }
}

module.exports = Company;
