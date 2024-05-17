const sql = require("../../db.js");
const { randomUUID } = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret_key = "chavesecreta";

class User {
  async register(user) {
    const id = randomUUID();

    const { name, email, password, id_company } = user;

    let newPassword = bcrypt.hashSync(user.password, 10);
    await sql`insert into users(id, name, email, password, id_company) 
              values (${id},${name}, ${email}, ${newPassword}, ${id_company})`;
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

    return { token, userFound };
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
