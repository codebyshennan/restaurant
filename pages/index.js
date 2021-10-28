import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import clientPromise from '../lib/mongodb'


const Home = ({isConnected, menuItems}) => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}

export const getServerSideProps = async(context) => {
  const client = await clientPromise
  const db = client.db('fastfood')
  const data =  await db.collection('menu').find({}).toArray()

  const menuItems = JSON.parse(JSON.stringify(data))
  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected()

  return {
    props: { isConnected, menuItems },
  }
}


/** 
 * export const getStaticProps = async ({ params }) => {
 *  const data = await fetch(`${process.env.APP_DOMAIN}/api/menu/details?item_id=${params.item_id}`)
 *  const item = await data.json()
 * 
 *  return {
 *    props: { item },
 *    revalidate: 60 * 60 * 24
 * }
 *  
 * } 
 */

/**
 * export const getStaticPaths = async() => {
 * 
 * 
 *  return {
 *    paths: [],
 *    fallback: true
 *  }
 * 
 * }
 */


export default Home