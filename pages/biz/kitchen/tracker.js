import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
// import Pusher from 'pusher'
// import PusherJS from 'pusher-js';
import useSWR from 'swr'
import Navbar from '../../../components/biz/kitchen/Navbar'
import StatusBar from '../../../components/biz/kitchen/StatusBar'
import dbConnection from '../../../lib/mongodb'
import OrderCards from '../../../components/biz/kitchen/OrderCards'
import 'tailwindcss/tailwind.css'

const fetcher = (...args) => fetch(...args).then(res=> res.json())

const Tracker = ({ordersData}) => {

  // continuously fetch data from server
  const { data, error } = useSWR('/api/kitchen/orders', fetcher, { refreshInterval: 1000 })

  if (error) return (<div>Failed to load</div>)
  if (!data) return (<div> Loading... </div>)

  // find out how to hot-sync current state with incoming state
  // need to filter differenes


  return (
    <>
      <Navbar />
      <div className="mt-3 ml-3 overflow-x-auto">
        <OrderCards orders = { data } />
      </div>
      <StatusBar orders = {data}/>
    </>
  )
}

export default Tracker


export const getServerSideProps = async(context) => {
  const client = await dbConnection()
  const db = client.db('fastfood')
  const data =  await db.collection('meals').aggregate([{
    $lookup: {
      from: "items",
      localField: "side_id",
      foreignField: "_id",
      as: "sides"
    }
  }, {
    $lookup: {
      from: "items",
      localField: "beverage_id",
      foreignField: "_id",
      as: "beverages"
    }
  }]).toArray()

  const ordersData = JSON.parse(JSON.stringify(data))

  return {
    props: {
      ordersData
    }
  }

}