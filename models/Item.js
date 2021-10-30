import mongoose, {Schema} from 'mongoose'


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
    enum: ['main','side','beverage','dessert']
  },
  image_url: {
    required: [true, "Please provide an image for this asset"],
    type: String
  },
  price: [{
    size: {
      type: String,
      enum: ['default','S','M','R','L']
    }, 
    price: {
      type: Number,
    }
  }],
  ingredients: [{  
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
  }],
  in_stock: {
    type: Boolean
  },
  created_at: {
    type: Date
  }
})

// export default mongoose.models.Item || mongoose.model('Item', ItemSchema)