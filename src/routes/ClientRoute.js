const Client = require("../controller/client.controller")

const clientRoute = async (fastify, options) => {
    const db = new Client();

    fastify.get("/client", async (response, reply)=>{
        try{
            const client = await db.list()

            return reply.code(200).send(client)
        }catch(error){
            reply.code(500).send({ message : error})
        }
    })

    fastify.post("/client", async (response, reply)=>{
        try{
            const client = response.body;
            const result = await db.create(client)
            console.log(result)
            reply.code(201).send(result)
        } catch(error){
            reply.code(500).send({ message : error})
        }
    })
}

module.exports = clientRoute