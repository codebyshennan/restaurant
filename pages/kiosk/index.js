import React, {useState, createContext} from 'react';
import 'tailwindcss/tailwind.css'
import {
  Route,
  NavLink,
  Router,
  Switch
} from "react-router-dom";
import styles from '../../components/App.module.css'
import Splash from '../../components/kiosk/Splash.jsx'
import Lunch from '../../components/kiosk/menu/Lunch.jsx';
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MealSelect from '../../components/kiosk/MealSelect.jsx';
import SidebarMenu from '../../components/kiosk/SidebarMenu.jsx'
import PaymentMode from '../../components/kiosk/PaymentMode.jsx'
import CreditCardPayment from '../../components/kiosk/CreditCardPayment.jsx'
import SpecialRequest from '../../components/kiosk/SpecialRequest.jsx';
import Cart from '../../components/kiosk/Cart.jsx'
import Menu from '../../components/kiosk/Menu.jsx'
import SideSelection from '../../components/kiosk/menu/SideSelection.jsx';
import {createMemoryHistory} from 'history'
import Head from 'next/head'
import dbConnection from '../../lib/mongodb';
import PaymentSuccess from '../../components/kiosk/PaymentSuccess.jsx';


const history = createMemoryHistory();

// do we need to export or can we just put it in app?
export const CartContext = createContext()
export const MenuContext = createContext()
export const DineInContext = createContext()

const App = ({isConnected, menuItems}) => {
  const [dineIn, setDineIn] = useState(false)
  const [cartItems, setCartItems] = useState([])

  console.log(menuItems)
  return (
    <div className="container justify-items-center w-screen">
      <Head>
        <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Router history={history}>
        <div className={styles.App}>

          <Switch>

            <CartContext.Provider value ={{cartItems, setCartItems}}>
              <MenuContext.Provider value ={menuItems}>
              <Route exact path="/">
                <Splash dineIn={dineIn} setDineIn={setDineIn}/>
              </Route>
              <Route path="/menu">
                <Menu/>
              </Route>

              <Route path="/mealselect">
                <MealSelect />
              </Route>

              <Route path="/sideselection">
                <SideSelection />
              </Route>
            <DineInContext.Provider value ={{dineIn, setDineIn}}>
              <Route path="/paymentmode">
                <PaymentMode />
              </Route>

              <Route path="/creditcardpayment">
                <CreditCardPayment />
              </Route>
            </DineInContext.Provider>

              <Route path="/specialrequest">
                <SpecialRequest />
              </Route>

              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/paysuccess">
                <PaymentSuccess />
              </Route>
            </MenuContext.Provider>
            </CartContext.Provider>

          </Switch>
          
        </div>
      </Router>
    </div>
  );
}


export const getServerSideProps = async(context) => {

  const client = await dbConnection()

  const db = client.db('fastfood')
  const data =  await db.collection('items').find({}).toArray()

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




// export const getStaticProps = async ({ params }) => {
//   const data = await fetch(`${process.env.APP_DOMAIN}/api/menu/details?item_id=${params.item_id}`)
//     const item = await data.json()
  
//     return {
//       props: { item },
//       revalidate: 60 * 60 * 24
//   }
    
// } 



export default App;
