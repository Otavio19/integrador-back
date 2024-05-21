const sql = require("../../db.js")
const randomUUID = require("crypto")

class Order {

    async list(){
        const orders = await sql`SELECT * FROM orders`
        return orders
    }

    async create(order){
        const orderId = randomUUID()
        const {id_user, id_client, id_company, price} = order
        const result = await sql`INSERT INTO orders
        (id, id_user, id_client, id_company, price)
        values(${orderId},${id_user} ,${id_client}, ${id_company}, ${price})`

        return result
    }
}

module.exports = Order