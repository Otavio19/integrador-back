import sql from "../../db.js";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secret_key = "chavesecreta";

class User {
  async list() {
    const users = await sql`SELECT * FROM users`;
    return users;
  }

  async getById(id) {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`;
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
    try {
      const decodedToken = jwt.verify(token, secret_key);
      const user = await sql`SELECT * FROM users WHERE email = ${decodedToken.userFound.email}`;
      return user;
    } catch (error) {
      throw new Error("Token inválido ou expirado.");
    }
  }

  async findUserById(userId) {
    const user = await sql`SELECT * FROM users WHERE id = ${userId}`;
    if (user.length === 0) {
      return null;
    }
    return user[0];
  }
}

export default User;
