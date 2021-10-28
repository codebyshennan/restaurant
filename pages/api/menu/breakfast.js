import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb'


const breakfastHandler = async (req,res) => {
  const {method} = req.body
  const query = req.query.item_id

  const client = await clientPromise
  const db = client.db('fastfood')

  const data = await db.collection('menu').find({}).toArray()
  // const data = await db.collection('menu').findOne({_id: new ObjectId(query)})

  res.json(data)

}

export default breakfastHandler