const sql = require("../../db.js")
const randomUUID = require("crypto")
const OrderProduct = require("./orderProduct.constroller.js")
class Order {
    async list(){
        const orders = await sql`SELECT * FROM orders`
        return orders
    }

    async orderById(id){
        const order = await sql`SELECT * FROM orders WHERE id = ${id}`

        return order[0]
    }

    async create(order){
        const orderId = randomUUID()
        const {id_user, id_client, id_company, price} = order
        const result = await sql`INSERT INTO orders
        (id, id_user, id_client, id_company, price)
        values(${orderId},${id_user} ,${id_client}, ${id_company}, ${price})`
        return result
    }

    async productsByOrder(id){
        const orderProduct = await sql`SELECT * FROM order_product WHERE id_order = ${id}`
        
        console.log(id)
        return orderProduct
    }
}

module.exports = Order