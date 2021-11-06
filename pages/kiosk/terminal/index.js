import React, { useEffect, useRef, useState } from 'react'
// import Terminal from '../../../components/payments/stripe/Terminal'
import dynamic from 'next/dynamic'
import { loadStripeTerminal } from '@stripe/terminal-js/pure';
import 'tailwindcss/tailwind.css'


const Terminal = () => {

  const [ terminal, setTerminal ] = useState('')
  const [ creditCard, setCreditCard ] = useState('')
  const creditCardRef = useRef('')

  let discoveredReaders

  const discoverAndConnectReader = (terminal) => {
    let config = { simulated : true }
    terminal.discoverReaders(config).then(discoverResult => {
      if(discoverResult.error) {
        log(`Failed to discover: ${discoverResult.error}`)
      } else if (discoverResult.discoveredReaders.length === 0 ) {
        log('No available readers')
      } else {
        discoveredReaders = discoverResult.discoveredReaders
        log('Starting Terminal...')
        const selectedReader = discoveredReaders[0] // simulated
        terminal.connectReader(selectedReader)
          .then(connectResult => {
            if(connectResult.error) {
              log(`Failed to connect: ${connectResult.error}`)
              return
            } else {
              log(`Connected to reader: ${connectResult.reader.label}`)
              return 
            }
          })
      }
    })
  }


  // init function when order is at checkout page
  // send body message as a JSON string
  const fetchPaymentIntentClientSecret = (amount)=> {
    const bodyContent = JSON.stringify({amount: 100})

    return fetch('/api/terminal/create_payment_intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyContent
    })
    .then( res => res.json())
    .then(data => data.client_secret)
  }


  const capture = (paymentIntentId) => {
    return fetch('/api/terminal/capture_payment_intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({'id': paymentIntentId})
    })
    .then(res => res.json())
    .then(data => log(JSON.stringify(data.status)))
  }

  const collectPayment = async( creditCard )=> {

    // get the client intent secret for further payment
    const clientSecret = await fetchPaymentIntentClientSecret()

    terminal.setSimulatorConfiguration({testCardNumber: creditCard.toString() });
    const result = await terminal.collectPaymentMethod(clientSecret)
    if (result.error) {
      // Placeholder for handling result.error
    } else {
        log("Collecting Payment Method...");
        const processingPayment = await terminal.processPayment(result.paymentIntent)
        if (processingPayment.error) {
          // Placeholder for handling result.error
        } else if (processingPayment.paymentIntent) {
            const paymentIntentId = processingPayment.paymentIntent.id;
            log("Parsing payment intent...");
            capture(paymentIntentId)
        }
      };
    }


  useEffect(() => {
    
    const getData = async()=> {
    
        const StripeTerminal = await loadStripeTerminal();

        const terminal = StripeTerminal.create({
          onFetchConnectionToken: async () => {
            return fetch('/api/terminal/connection_token', { method : 'POST'})
              .then(res => res.json())
              .then(data => data.secret)
          },
          onUnexpectedReaderDisconnect: ()=> {
            // In this function, your app should notify the user that the reader disconnected.
            // You can also include a way to attempt to reconnect to a reader.
            log('Disconnected from reader')
          }
        })

        setTerminal(terminal)

        // first connect to a reader (Simulator)
        discoverAndConnectReader(terminal)

    }

    getData()

    creditCardRef.current.focus()
  }, [])

  const inputCreditCard = (event) => {
    if(event.target.value.length == 16) {
      log("Authorizing payment...")
      collectPayment(creditCardRef.current.value)
    }
  } 

  const log = (message) => {
    const screen = document.getElementById('screen')
    screen.innerHTML += '<br>'
    screen.innerText += message
  }


  return (
    <div className="relative">
      <div className="w-0 overflow-hidden opacity-0">    {/* <Terminal /> */}
        <input type="password" name="CreditCard" defaultValue="" ref={creditCardRef} onChange = { inputCreditCard } />
      </div>
      <div style={{width: "330px", height:"300px"}} className="text-center z-50 absolute border-2 border-black rounded p-4 ml-6 mt-2 iverflow-y-auto" id="screen"></div>
      <svg className="z-1" width="376" height="643" viewBox="0 0 376 643" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="53" width="376" height="590" rx="20" fill="#565656"/>
        <rect x="18" width="342" height="315" rx="10" fill="#282828"/>
        <rect x="17" y="322" width="342" height="306" rx="10" fill="#282828"/>
        <rect x="43" y="427" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="251" y="427" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="147" y="427" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="44" y="497" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="252" y="497" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="148" y="497" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="43" y="356" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="251" y="356" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="147" y="356" width="82" height="48" rx="10" fill="#C4C4C4"/>
        <rect x="44" y="564" width="82" height="48" rx="10" fill="#B70000"/>
        <rect x="252" y="564" width="82" height="48" rx="10" fill="#0CD114"/>
        <rect x="148" y="564" width="82" height="48" rx="10" fill="#FFE600"/>
        <rect x="26" y="8" width="326" height="298" rx="10" fill="white"/>
      </svg>
    </div>
  )
}

export default Terminal
