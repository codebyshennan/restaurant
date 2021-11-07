import react from 'react'
import dbConnection from '../../../lib/mongodb'
const ObjectID = require('mongodb').ObjectID

const ordersHandler = async (req, res) => {

  //get the orders and paginate accordingly
  const client = await dbConnection()
  const db = client.db('fastfood')
  const { method } = req

  if(method == "GET") {
    const ordersData = await db.collection('orders').find({}).toArray()
    res.status(200).send(ordersData)
  }

  if(method == "DELETE") {
    
    // delete
    const id = req.body
    console.log(id)
    const updateOrder = await db.collection('orders').updateOne({"_id": ObjectID(id)}, {$set: {"status": "completed", "completed_at": new Date()}}, {upsert: true})
    console.log(updateOrder)
    res.send(updateOrder)
  }

}



export default ordersHandler