import mongoose, {Schema} from 'mongoose'

export const IngredientSchema = new Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number
  },
  price_per_unit: {
    type: Number
  },
  limit: {
    type: Number
  }
})


export default mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema )