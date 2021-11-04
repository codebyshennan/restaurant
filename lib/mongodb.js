import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

const architecture = process.env.NEXT_PUBLIC_GOOSE_OR_GOD
const uri = process.env.NEXT_PUBLIC_MONGODB_URI


  /**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */


let cached = global.mongoose

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}
  
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}


const dbMongooseConnect = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}


const dbMongoConnect = () => {

  let client
  let clientPromise
  
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {

    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
    return clientPromise

  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
    return clientPromise
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.

const dbConnection = architecture === "GOOSE" ? dbMongooseConnect : dbMongoConnect

export default dbConnection

  