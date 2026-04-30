import dbConnection from '../../lib/mongodb';


const queueHandler = async (req,res) => {
  const {method, body} = req

  if(method=="GET"){
    try {
        // connect to the database
        const client = await dbConnection();
        const db = client.db('fastfood')
        // add the post
        const result = await db.collection('queue').find({}).toArray()
        // return a message
        if (result.length === 0) {
            return res.json(0);
        }
        return res.json(result[0].seq_value);
    } catch (error) {
        // return an error
        return res.send({
            message: new Error(error).message,
            success: false,
        });
        }
    }
}


export default queueHandler