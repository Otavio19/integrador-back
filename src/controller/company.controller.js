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
}

module.exports = Company;
