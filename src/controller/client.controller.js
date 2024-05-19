const { randomUUID } = require("crypto");
const sql = require("../../db.js");

class Client {

    async list(){
        let clients 
        
        clients = await sql`SELECT * FROM client`

        return clients
    }

    async create(client){
        const clientId = randomUUID()

        const {name, email, password, id_seller, id_company} = client

        await sql`INSERT INTO client(id, name, email, password, id_seller, id_company) VALUES (${clientId}, ${name}, ${email}, ${password}, ${id_seller}, ${id_company})`
    }
}

module.exports = Client