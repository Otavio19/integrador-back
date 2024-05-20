const sql = require("../../db.js"); // Interação com o Banco de dados
const { randomUUID } = require("crypto"); // Criação automatica de um UUID aleatório
const secret_key = "chavesecreta"; // Chave Secreta para criptografia
const bcrypt = require("bcrypt"); // Criptografa
const jwt = require("jsonwebtoken"); // Criação do Token

class Auth {
  async register(user) {
    const id = randomUUID();

    const { name, email, password, id_company } = user;

    const newPassord = bcrypt.hashSync(password, 10);

    const register = sql`INSERT 
    INTO users(id, name, email, password, id_company) 
    VALUES (${id}, ${name}, ${email}, ${newPassord}, ${id_company})`;

    return register;
  }

  async login(user) {
    const { email, password } = user;

    let userFound = await sql`
        SELECT * FROM users 
        WHERE email = ${email}`;

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
}

module.exports = Auth;
