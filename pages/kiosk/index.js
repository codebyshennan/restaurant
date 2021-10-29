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
import Item from '../../models/Item'


const history = createMemoryHistory();

// do we need to export or can we just put it in app?
export const CartContext = createContext()

const App = ({result}) => {
  const [dineIn, setDineIn] = useState(false)
  const [cartItems, setCartItems] = useState([])

  console.log(result)
  return (
    <div className="container">
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

              <Route path="/paymentmode">
                <PaymentMode />
              </Route>

              <Route path="/creditcardpayment">
                <CreditCardPayment />
              </Route>

              <Route path="/specialrequest">
                <SpecialRequest />
              </Route>

              <Route path="/cart">
                <Cart />
              </Route>

            </CartContext.Provider>

          </Switch>
          
        </div>
      </Router>
    </div>
  );
}

export const getServerSideProps = async() => {
  await dbConnection()

  const result = await Item.find({})
  console.log(result)
  


  return { props: {
                    result: JSON.parse(JSON.stringify(result))
                  }
                }

}



export default App;
