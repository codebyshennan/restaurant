import react from 'react'
import dbConnection from '../../../lib/mongodb'

const ordersHandler = async (req, res) => {

  //get the orders and paginate accordingly
  const client = await dbConnection()
  const db = client.db('fastfood')
  const ordersData = await db.collection('orders').find({}).toArray()
  res.status(200).send(ordersData)

}



export default ordersHandler