const sql = require("../../db.js")
const randomUUID = require("crypto")

class OrderProduct{

    async listByOrder(id){
        const orderProduct = await sql`SELECT * FROM order_product WHERE id_order = ${id}`
        return orderProduct
    }
}

module.exports = OrderProduct