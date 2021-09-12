import axios from "axios"
var CryptoJS = require("crypto-js")

const viewStatusUpdate = () => {
  const url = process.env.GATSBY_FTPURL

  // axios call to backend
  const data = {
    siteName: 'lazyftp',
    type: 'page_visits'
  }

  // encrypt data and send as POST
  let cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.GATSBY_PASSWORD
  ).toString()

  axios({
    method: "post",
    url: `${url}/update`,
    data: { cipherText },
  }).then(() => console.log("Success?"))

  console.log("Ran Through")
}

export default viewStatusUpdate