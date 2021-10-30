import mongoose, { Schema } from 'mongoose'
import ItemSchema from './Item'

export const MealSchema = new Schema({
  name: {
    type: String,
  },
  side: {
    type: String,
  },
  main: {
    type: ItemSchema
  },
  side: {
    type: ItemSchema
  },
  beverage: {
    type: ItemSchema
  },
  is_upsized: {
    type: Boolean
  },
  total_cost: {
    type: Number
  },
  created_at: {
    type: Date
  }
})

// export default mongoose.models.Meal || mongoose.model('Meal', MealSchema)