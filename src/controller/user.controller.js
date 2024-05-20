const sql = require("../../db.js");
const { randomUUID } = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret_key = "chavesecreta";

class User {
  async list() {
    const users = await sql`SELECT * FROM users`;

    return users;
  }

  async getById(id) {
    const user = sql`SELECT * FROM users WHERE id = ${id}`;

    return user;
  }

  async getByCompany(id) {
    const users = await sql`SELECT * FROM users WHERE id_company = ${id}`;

    return users;
  }

  async update(id, user) {
    const { name, email, password, active } = user;
    const update = await sql`
      UPDATE users SET
      name = ${name},
      email = ${email},
      password = ${password},
      active = ${active}
      WHERE id = ${id}
    `;

    return update;
  }

  async verifyToken(token) {
    let decodedToken = jwt.verify(token, secret_key);
    let user = sql`SELECT * FROM users WHERE email = ${decodedToken.userFound.email}`;
    return user;
  }

  async findUserById(userId) {
    const user = sql`SELECT * FROM users WHERE id = ${userId}`;

    if (!user) {
      return null;
    }

    return user;
  }
}

module.exports = User;
