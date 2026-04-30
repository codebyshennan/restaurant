import dbConnection from '../../../lib/mongodb'
const ObjectID = require('mongodb').ObjectID

const ordersHandler = async (req, res) => {

  const { method } = req

  if(method === "GET") {
    try {
      //get the orders and paginate accordingly
      const client = await dbConnection()
      const db = client.db('fastfood')
      const ordersData = await db.collection('orders').find({}).toArray()
      res.status(200).send(ordersData)
    } catch (error) {
      res.status(500).send({ message: new Error(error).message, success: false })
    }
  }

  if(method === "PUT") {
    try {
      const client = await dbConnection()
      const db = client.db('fastfood')
      const id = req.body
      const updateOrder = await db.collection('orders').updateOne({"_id": ObjectID(id)}, {$set: {"status": "ready"}}, {upsert: false})
      res.send(updateOrder)
    } catch (error) {
      res.status(500).send({ message: new Error(error).message, success: false })
    }
  }

  if(method === "DELETE") {
    try {
      const client = await dbConnection()
      const db = client.db('fastfood')
      const id = req.body
      const updateOrder = await db.collection('orders').updateOne({"_id": ObjectID(id)}, {$set: {"status": "completed", "completed_at": new Date()}}, {upsert: false})
      res.send(updateOrder)
    } catch (error) {
      res.status(500).send({ message: new Error(error).message, success: false })
    }
  }

}



export default ordersHandler
