import dbConnection from "../lib/mongodb.js";
import Item from "../models/Item.js"
import Meal from "../models/Meal.js"

await dbConnection()
console.log("Seeding data")


const mozzaBurger = {
    name: "Mozza Burger",
    type: "main",
    image_url: "http://",
    price: [{
      size: "default",
      price: 5.8
    }],
    ingredients:[
      {
        name: "cheese",
        quantity: 1,
        price_per_unit: 0.7,
        limit: 2
      },
      {
        name: "lettuce",
        quantity: 1,
        price_per_unit: 0.7,
        limit: 2
      }
    ],
    in_stock: true,
    created_at: new Date()
  }

const waffle = {
    name: "Waffle with ice-cream",
    type: "side",
    image_url: "http://",
    price: [{
      size: "default",
      price: 5.8
    }],
    ingredients:[
      {
        name: "cheese",
        quantity: 1,
        price_per_unit: 0.7,
        limit: 2
      },
      {
        name: "lettuce",
        quantity: 1,
        price_per_unit: 0.7,
        limit: 2
      }
    ],
    in_stock: true,
    created_at: new Date()
  }

const rootBeer = {
    "name": "Root Beer",
    "type": "beverage",
    "image_url": "http://",
    "price": [{
      "size": "default",
      "price": 5.8
    }],
    "ingredients": null,
    "in_stock": true,
    "created_at": new Date()
  }

const items = [
  mozzaBurger, rootBeer, waffle
]

const MozzaBurgerMeal = {
    name: "MozzaBurger Meal",
    side: waffle,
    main: mozzaBurger,
    beverage: rootBeer,
    is_upsized: false,
    total_cost: 10.90,
    created_at: new Date()
  }

const meals = [MozzaBurgerMeal]

const importData = async () => {
  try {
    await Item.insertMany(items)
    await Meal.insertMany(meals)
    console.log("Data imported")


    // 0 is a success code and 1 (or any other number) can be a failure code
    process.exit()
  } catch (error) {
    console.log("Data not imported", error.message)
    process.exit(1)
  }



}