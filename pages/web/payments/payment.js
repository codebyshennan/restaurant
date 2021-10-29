import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Flex, Container } from '@chakra-ui/react'
import Cart from '../../../components/web/payments/cart'
import CustomerDetails from '../../../components/web/payments/customerDetails'


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentPage = () => {
  <Container maxW="container.xl" p={0}>
    <Flex 
      h={{base: 'auto', md: '100vh'}}
      py={[0,10,20]}
      direction={{base: 'column-reverse', md: 'row'}}
      >
        <CustomerDetails />
        <Cart />
      </Flex>
  </Container>


}