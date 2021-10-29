import mongoose, {Schema} from 'mongoose'
import { ItemSchema } from './Item'

// orderSchema should correspond to a collection in the database

const OrderSchema = new Schema({

// TO BE ADDED AS A DB TRIGGER
// https://www.mongodb.com/basics/mongodb-auto-increment
  // queue_number: {
  //   type: String,
  //   required: []
  // },
  order_list: {
    type: [ItemSchema],
    required: [true, 'Order cannot be empty']
  },
  status: {
    type: String,
  }, 
  payment_by: {
    type: String,
  },
  total_cost: {
    type: Number,
  },
  created_at: {
    type: Date
  }
})
 
// sample Order:
/** 
  {
  _id: 'adgrg42312',
  queue_number: '120',
  order_list: [ {...}],
  status: 'preparing',
  payment_by: 'card', //cash
  total_cost: 20.39,
  created_at: '20211010 20:10'
  }
*/

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)