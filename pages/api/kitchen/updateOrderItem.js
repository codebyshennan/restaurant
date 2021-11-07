import react from 'react'
import dbConnection from '../../../lib/mongodb'

const UpdateOrderItems = async (req, res) => {
  // id of order to mutate
  const data = req.body

  if(req == "UPDATE") {
      //get the orders and paginate accordingly
    const client = await dbConnection()
    const db = client.db('fastfood')
    const ordersData = await db.collection('orders')
    const filter = { _id: data._id}
    const updateDoc = {
      $set: {
        "ingredients.$[]" : value
      }
    }
    res.status(200).send(ordersData)

  }

}



export default UpdateOrderItems