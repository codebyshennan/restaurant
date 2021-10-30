import React, {useState} from 'react'
import dbConnection from '../../../lib/mongodb'

const Tracker = ({orderItems, isConnected}) => {

  console.log(isConnected)
  const [orders, setOrders] = useState([...orderItems])

  const [processing, setProcessing] = useState([])
  const [completed, setCompleted] = useState([])
  console.log(orderItems)

  const list = orders.map(order=> {
    return (
      <li key={order._id}> {order._id} : {order.name}</li>
    )
  })

  return (
    <div>
      Order Tracking
      <ul>
        {list}
      </ul>
    </div>
  )
}

export const getStaticProps = async() => {
  const client = await dbConnection()
  const db = client.db('fastfood')
  const orders = await db.collection('orders').find({}).toArray()

  const orderItems = JSON.parse(JSON.stringify(orders))
  const isConnected = await client.isConnected()

  return {
    props: {
      orderItems,
      isConnected
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  }
}


export default Tracker
