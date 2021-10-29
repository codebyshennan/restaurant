import { NumberIncrementStepper } from '@chakra-ui/number-input'
import mongoose, {Schema} from 'mongoose'
import { IngredientSchema } from './Ingredient.js'


export const ItemSchema = new Schema({

// TO BE ADDED AS A DB TRIGGER
// https://www.mongodb.com/basics/mongodb-auto-increment
  // queue_number: {
  //   type: String,
  //   required: []
  // },
  name: {
    type: String,
    required: [true, 'Item must have a name identifier']
  },
  type: {
    type: String,
  },
  image_url: {
    required: [true, "Please provide an image for this asset"],
    type: String
  },
  size: {
    type: String,
  },
  ingredients: [IngredientSchema],
  price: {
    type: Number,
  }, 
  in_stock: {
    type: Boolean
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

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)