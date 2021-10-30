import dbConnection from '../../lib/mongodb';


const ordersHandler = async (req,res) => {
  const {method, body} = req

    try {
        // connect to the database
        const client = await dbConnection();
        const db = client.db('fastfood')
        // add the post
        const result = await db.collection('orders').insertOne(JSON.parse(body))
        // return a message
        return res.status(201).send({
            message: 'Order added successfully',
            success: true,
            response: result
        });
    } catch (error) {
        // return an error
        return res.send({
            message: new Error(error).message,
            success: false,
        });
    }
}


export default ordersHandler