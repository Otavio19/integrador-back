const Order = require("../controller/orders.controller");

const orderRoute = async(fastify,options) =>{

    const db = new Order()

    fastify.get("/order", async(request, reply) =>{
        const orders = await db.list()
        
        try{
            reply.code(200).send(orders)
        }catch(error){
            reply.code(500).send({ message : error})
        }
    })

    fastify.get("/order/products/:id", async(request, reply)=>{
        const id = request.params.id;
        try{
            const response = await db.productsByOrder(id)
            reply.code(200).send(response)
        }catch(error){
            reply.code(500).send({ message : error })
        }
    })

    fastify.get("/order/:id", async(request, reply)=>{
        const id = request.params.id;

        try{
            const orders = await db.orderById(id)
            const products = await db.productsByOrder(id)
            reply.code(201).send({order: orders, products : products})
        }catch(error){
            reply.code(500).send(error)
        }
    })

    fastify.post("/order", async(request, reply)=>{
        const order = await request.body;

        try{
            const response = await db.create(order)

            reply.code(201).send(response)
        }catch(error){
            reply.code(500).send({ message : error })
        }
    })
}

module.exports = orderRoute