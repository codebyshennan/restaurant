import React, {useState, useEffect} from 'react'
import dbConnection from '../../../lib/mongodb'
import { useRouter } from 'next/router'
import Pusher from 'pusher'
import PusherJS from 'pusher-js';




const Tracker = ({orderItems, isConnected}) => {
  const [orders, setOrders] = useState([...orderItems])
  const PUSHER_APP_KEY = 'af96cdfce1e5ce13c615';
  const PUSHER_APP_CLUSTER = 'ap1';
  const pusherJS = new PusherJS(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    });
  const channel = pusherJS.subscribe('orders');

  channel.bind('inserted', data => {
    console.log('insrted')
    setOrders([...orders, JSON.parse(data)])
  });
  channel.bind('deleted', data => {
    console.log('deleted')
    setOrders([...orders.filter(order=> order._id != data)])
  });

  
  console.log(isConnected)


  const [processing, setProcessing] = useState([])
  const [completed, setCompleted] = useState([])

  useEffect(()=> {

      // const dataQuery = ()=> {
      //   // const getData = await fetch('/api/orders', {
      //   //   method: 'GET'
      //   // })

      //   // const data = await getData.json()
      //   // setOrders(data) 

        
      // }

      // dataQuery()
      // // setTimeout(()=> router.reload(window.location.pathname), 2000)

  })

  const list = orders.map(order=> {
    return (
      <li key={order._id}> {order._id} : {order.status}</li>
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

export const getStaticProps = async(context) => {

  const pusher = new Pusher({
    appId: "1290096",
    key: "554464cbeb3956155d70",
    secret: "af96cdfce1e5ce13c615",
    cluster: "ap1",
    useTLS: true
  });

  
  const client = await dbConnection()
  const db = client.db('fastfood')
  const orders = db.collection('orders')
  const changeStream = orders.watch()
  const channel = 'orders'
  changeStream.on('change', change => {
    
    if(change.operationType === 'insert') {
      const order = change.fullDocument;
      pusher.trigger(
        channel,
        'inserted', 
        {
          id: order._id,
          order: JSON.stringify(order),
        }
      ); 
    } else if(change.operationType === 'delete') {
      pusher.trigger(
        channel,
        'deleted', 
        change.documentKey._id
      );
    }
  })
  const isConnected = await client.isConnected()


  

  return {
    props: {
      orderItems: JSON.parse(JSON.stringify(await db.collection('orders').find({}).toArray())),
      isConnected
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 2, // In seconds
  }
}


export default Tracker
