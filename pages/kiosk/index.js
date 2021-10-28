import React, {useState, createContext} from 'react';
import 'tailwindcss/tailwind.css'
import {
  Route,
  NavLink,
  Router,
  Switch
} from "react-router-dom";
import styles from '../../components/App.module.css'
import Splash from './Splash.jsx'
import Lunch from './menu/Lunch.jsx';
import Hero from './Hero.jsx'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MealSelect from './MealSelect.jsx';
import SidebarMenu from './SidebarMenu.jsx'
import PaymentMode from './PaymentMode.jsx'
import CreditCardPayment from './CreditCardPayment.jsx'
import SpecialRequest from './SpecialRequest.jsx';
import Cart from './Cart.jsx'
import Menu from './Menu.jsx'
import SideSelection from './menu/SideSelection.jsx';
import {createMemoryHistory} from 'history'
import Head from 'next/head'


const history = createMemoryHistory();

// do we need to export or can we just put it in app?
export const CartContext = createContext()

const App = () => {
  const [dineIn, setDineIn] = useState(false)
  const [cartItems, setCartItems] = useState([])

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

export default App;
