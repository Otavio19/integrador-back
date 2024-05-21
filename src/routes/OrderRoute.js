const Order = require("../../db.js");

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