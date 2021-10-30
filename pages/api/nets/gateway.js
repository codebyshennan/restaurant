// //JAVA SAMPLE
// @RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, value = "/s2sTxnEnd", method = RequestMethod.POST)
//   public ResponseEntity<void> receiveS2STxnEnd(@RequestBody String txnRes, HttpServletRequest request) {
//     log.debug("MERCHANT APP : in receiveS2STxnEnd :" + txnRes);//json message received as string
//     try {
//       String generatedHmac = Util.generateSignature(txnRes, "f49015ce-84fd-4e9a-a24e-8aeb30d870d6");//generate mac
//       String macFromGW = request.getHeader("hmac");
//       log.info ("MERCHANT APP : header hmac  received :" + macFromGW);//
//       log.info("MERCHANT APP : header hmac  generated :" + generatedHmac);
//       if(generatedHmac.equalsIgnoreCase(macFromGW)){
//         //parse message
//       SoapiS2S txnResObj = mapper.readValue(txnRes, SoapiS2S.class);
//       log.info("MERCHANT APP : in receiveS2STxnEnd :" + txnResObj);
//                          //Please handle success or failure response code

//       }
//       else{
//         log.error("signature not matched.");
//         //handle exception flow
//       }
//     } catch (Exception e) {
//       // TODO handle exception
//       log.error(e);
//     }
//     return new ResponseEntity<void>(HttpStatus.OK);
//   }


const netsPortal = (req, res) => {
  // console.log(req)
  const {message, hmac, KeyId} = req.body

  const decodedMessage = decodeURIComponent(message)
  // if hmac and keyId (public key) match
  res.json(decodedMessage, hmac, KeyId)

  // redirect back after decoding and ensuring compliance
  // print receipt
  //might wanna consider middleware
}

export default netsPortal