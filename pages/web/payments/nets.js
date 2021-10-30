import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Script from 'next/script'
import { useEffect } from 'react' 
import CryptoJS from 'crypto-js';

// Test Credit Card Details
// VISA Card Number: 4111-1111-1111-1111
// MasterCard Number: 5111-1111-1111-1111

// Expiry Date: MM/YY (Any future date after current month)

// CVV: Any 3 digits

// const publicKey = process.env.NETS_PUB
// const secretKey = process.env.NETS_SECRET

// NETSQR

// Key ID: 231e4c11-135a-4457-bc84-3cc6d3565506
// Secret Key: 16c573bf-0721-478a-8635-38e53e3badf1
// MID: 11137066800
// TID: 37066801
// Institution code: 20000000001

const publicKey = "154eb31c-0f72-45bb-9249-84a1036fd1ca"
const secretKey = "38a4b473-0295-439d-92e1-ad26a8c60279"

const dateParser = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day=date.getDate()

  let hour = date.getHours() % 12
  if (hour < 10) {
    hour = '0'+JSON.stringify(hour)
  }
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${year}${month}${day} ${hour}:${minute}:${second}`
}

const addMilli = (date) => {

  const milli = date.getMilliseconds()
  return `${dateParser(date)}.${milli}`

}


const sampleReq = {
  "ss":"1",
  "msg":{
    "netsMid":"UMID_877772003",
    "tid":"",
    "submissionMode":"B",
    "txnAmount":"1000", //cents
    "merchantTxnRef": dateParser(new Date()),
    "merchantTxnDtm": addMilli(new Date()),
    "paymentType":"SALE",
    "currencyCode":"SGD",
    "paymentMode":"",
    "merchantTimeZone":"+8:00",
    "b2sTxnEndURL":"http://localhost:3000/api/nets/gateway",
    "b2sTxnEndURLParam":"",
    "s2sTxnEndURL":"http://localhost:3000/api/nets/gateway", //for server to server call
    "s2sTxnEndURLParam":"",
    "clientType":"W",
    "supMsg":"",
    "netsMidIndicator":"U",
    "ipAddress":"127.0.0.1",
    "language":"en"
  }
}


const concatPayloadAndKey = ''.concat(JSON.stringify(sampleReq), secretKey)
const generatedSig = Base64.stringify(sha256(CryptoJS.enc.Utf8.parse(concatPayloadAndKey)))
// const encoder = new TextEncoder()
// console.log(encoder.encode(concatPayloadAndKey))

// const generatedSignature = Base64.stringify(sha256(encoder.encode(concatPayloadAndKey)))


const Nets = () => {
  // console.log(generatedSignature)

  const handleClick = () => {
    sendPayLoad(JSON.stringify(sampleReq), generatedSig, publicKey)
  }

  return (
    <>
      <Script crossorigin src="https://uat2.enets.sg/GW2/js/jquery-3.1.1.min.js" type="text/javascript"></Script>
      <Script crossorigin src="https://uat2.enets.sg/GW2/pluginpages/env.jsp"></Script>
      <Script crossorigin type="text/javascript" src="https://uat2.enets.sg/GW2/js/apps.js"></Script>
      <div id="anotherSection">
        <fieldset>
          <div id="ajaxResponse"></div>
        </fieldset>
        <button onClick={handleClick}>test</button>
      </div>
    </>
  )
}



export default Nets