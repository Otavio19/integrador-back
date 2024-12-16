import sql from "../../db.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret_key = "chavesecreta";

class Auth {
  async register(user) {
    const id = randomUUID();

    const { name, email, password, id_company } = user;

    const newPassword = await bcrypt.hash(password, 10);

    const register = await sql`
      INSERT INTO users(id, name, email, password, id_company) 
      VALUES (${id}, ${name}, ${email}, ${newPassword}, ${id_company})
    `;

    return register;
  }

  async login(user) {
    const { email, password } = user;

    let userFound = await sql`
      SELECT * FROM users 
      WHERE email = ${email}
    `;

    if (userFound.length === 0) {
      return null;
    }

    const hashedPassword = userFound[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return null;
    }

    userFound[0].password = "";

    const token = jwt.sign({ user: userFound[0] }, secret_key, {
      expiresIn: "1h",
    });

    return { token, user: userFound[0] };
  }
}

export default Auth;
