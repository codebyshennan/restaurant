import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
// import Pusher from 'pusher'
// import PusherJS from 'pusher-js';
import useSWR from 'swr'
import Navbar from '../../../components/biz/kitchen/Navbar'
import StatusBar from '../../../components/biz/kitchen/StatusBar'
import dbConnection from '../../../lib/mongodb'
import 'tailwindcss/tailwind.css'
import VerticalTabs from '../../../components/biz/kitchen/TabPanel'
import Grid from '@mui/material/Grid'

const fetcher = (...args) => fetch(...args).then(res=> res.json())

const Settings = ({orders}) => {

  // continuously fetch data from server
  const { data, error } = useSWR('/api/kitchen/orders', fetcher, { refreshInterval: 1000 })

  const Loader = ({message}) => {
    return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
      { message == "loading" ? <CircularProgress /> : "Error: Failed to load"}
      </Grid>   
      
    </Grid> 
    )
  }

  if (error) return (<Loader message={"failed"} />)
  if (!data) return (<Loader message={"loading"} />)


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