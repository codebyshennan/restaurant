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
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import VerticalTabs from '../../../components/biz/kitchen/TabPanel'


const fetcher = (...args) => fetch(...args).then(res=> res.json())

const Settings = ({orders}) => {

  // continuously fetch data from server
  const { data, error } = useSWR('/api/kitchen/orders', fetcher, { refreshInterval: 1000 })

  if (error) return (<div>Failed to load</div>)
  if (!data) return (<div> Loading... </div>)

  // find out how to hot-sync current state with incoming state
  // need to filter differenes
  console.log(data)
  console.log(orders)


  return (
    <>
      <Navbar />
      <VerticalTabs />
      <StatusBar orders = { data }/>
    </>
  )
}

export default Settings


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

  const orders = JSON.parse(JSON.stringify(data))

  return {
    props: {
      orders
    }
  }

}