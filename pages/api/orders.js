import dbConnection from '../../lib/mongodb';


const ordersHandler = async (req,res) => {
  const {method, body} = req

  if(method === "POST"){
    try {
        // connect to the database
        const client = await dbConnection();
        const db = client.db('fastfood')
        // add the post
        const parsedBody = req.body
        const result = await db.collection('orders').insertOne(parsedBody)
        // return a message
        return res.json(result);
    } catch (error) {
        // return an error
        return res.send({
            message: new Error(error).message,
            success: false,
        });
        }
    } else if (method === "GET") {
        try {
        const client = await dbConnection()
        const db = client.db('fastfood')
        const orders = await db.collection('orders').find({}).toArray()
        return res.json(orders)
        } catch (error) {
            return res.send({
                message: new Error(error).message,
                success: false,
            });
        }
    }
}


export default ordersHandler