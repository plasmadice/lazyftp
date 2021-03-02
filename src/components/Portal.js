import React, { useState, useEffect } from "react"
import {
  Button,
  Item,
  Container,
  Icon,
  Dimmer,
  Loader,
  Message,
  Grid,
  TransitionablePortal,
  Segment,
  Header,
  Form,
  Divider,
  Checkbox,
  Responsive,
} from "semantic-ui-react"
import axios from "axios"
import arraySort from "array-sort"
import moment from "moment"
import copy from "copy-text-to-clipboard"
var CryptoJS = require("crypto-js")
import Navigation from "./navigation"
import Login from "./login"

const Portal = () => {
  const [data, setData] = useState([])
  const [files, setFiles] = useState([])
  const [host, setHost] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [secure, setSecure] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pathName, setPathName] = useState("")
  const [sort, setSort] = useState("A-Z (Default)")
  const [loading, setLoading] = useState(false)
  const [copyPortal, setCopyPortal] = useState(false)
  const [pin, setPin] = useState("")
  const [error, setError] = useState(false)

  // ftp url pulled in from .env
  const url = process.env.GATSBY_FTPURL

  // fired on every page navigation and login
  const navigate = () => {
    // axios call to backend
    const data = {
      ftpHost: host,
      ftpUser: username,
      ftpPassword: password,
      path: pathName,
      ftpSecure: secure,
    }

    let cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.GATSBY_PASSWORD
    ).toString()

    axios({
      method: "post",
      url: `${url}/navigate`,
      data: { cipherText },
    })
      .then((res) => {
        const items = res.data.map((item) => {
          return {
            name: item.name,
            type: item.type,
            date: moment(item.rawModifiedAt).format("MMM DD h:mm A"),
            size: item.size,
          }
        })

        // prepares data, this triggers a buildItems()
        setData(items)
        // ends the load screen animation (if it's visible)
        setLoading(false)
        // login if not logged in
        if (isLoggedIn === false) setIsLoggedIn(true)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setLoading(false)
      })
  }

  // takes data object and formats it into <Item />
  const buildItems = () => {
    // initial items array
    let items = []

    // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    function formatBytes(a, b) {
      if (0 == a) return "0 Bytes"
      var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c))
      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    }

    // sorts items based on sort variable
    if (sort === "A-Z (Default)") {
      items = arraySort(data, "name")
    } else if (sort === "Z-A") {
      items = arraySort(data, "name", { reverse: true })
    } else if (sort === "Oldest") {
      items = arraySort(data, "date")
    } else if (sort === "Newest") {
      items = arraySort(data, "date", { reverse: true })
    }

    // Makes an <Item /> for every item
    const preparedItems = items.map((item, index) => {
      const copyPath = `ftp://${username}:${password}@ftp.national-anime.com${pathName}/${item.name}`

      const linkPath = `ftp://${username}:${password}@ftp.national-anime.com${encodeURI(
        pathName
      )}/${encodeURIComponent(item.name)}`
      console.log("copyPath:", copyPath)
      console.log("linkPath:", linkPath)
      console.log("pathName:", pathName)
      return (
        <Item key={index} name={item.name}>
          <Item.Content>
            <Item.Header
              as={item.type === 2 ? "a" : null}
              onClick={() => {
                // if folder
                if (item.type === 2) {
                  setPathName(`${pathName}/${item.name}`)
                  setLoading(true)
                } else {
                  // opens transition portal to show user what happened
                  setCopyPortal(true)
                  // copy to clipboard on click
                  copy(linkPath)
                }
              }}
            >
              {item.type === 2 ? (
                <Icon name="folder open" />
              ) : item.name.slice(-3) === "zip" ? (
                <Icon name="zip" />
              ) : item.name.slice(-3) === "rar" ? (
                <Icon name="zip" />
              ) : (
                <Icon name="video camera" />
              )}
              {item.name}
            </Item.Header>
            <Item.Extra>
              <Button
                size="mini"
                icon
                labelPosition="left"
                onClick={() => {
                  // opens transition portal to show user what happened
                  setCopyPortal(true)
                  // copy to clipboard on click
                  copy(copyPath)
                }}
              >
                <Icon color="black" name="copy" />
                Copy Path
              </Button>
              <Button
                size="mini"
                icon
                labelPosition="left"
                onClick={() => {
                  // opens transition portal to show user what happened
                  setCopyPortal(true)
                  // copy to clipboard on click
                  copy(linkPath)
                }}
              >
                Copy FTP Link
                <Icon color="black" name="chain" />
              </Button>
              {item.type !== 2 ? (
                <Button size="mini" icon labelPosition="left" color="orange">
                  Right-Click to Open in VLC
                  <Icon name="download" />
                  <video
                    src={linkPath}
                    style={{
                      position: "absolute",
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      left: "0px",
                      top: "0px",
                    }}
                  />
                </Button>
              ) : null}
            </Item.Extra>
            <Item.Extra>
              {item.type !== 2 ? `Size: ${formatBytes(item.size)} | ` : null}
              Last Modified: {item.date}
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    })

    // rewrites files object
    setFiles(preparedItems)
  }

  // buttons (changes to pathName triggers navigate())
  const goHome = () => {
    setPathName("")
    setLoading(true)
  }
  const goBack = () => {
    const newPath = pathName.slice(0, pathName.lastIndexOf("/"))
    setPathName(newPath)
    setLoading(true)
  }
  const disconnect = () => {
    const data = {
      ftpHost: host,
      ftpUser: username,
    }

    let cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.GATSBY_PASSWORD
    ).toString()

    // logs user out from backend if still logged in
    axios({
      method: "post",
      url: `${url}/disconnect`,
      data: { cipherText },
    })
    setIsLoggedIn(false)
    setPathName("")
  }

  // dev pin login
  const pinLogin = () => {
    if (pin === process.env.GATSBY_PIN) {
      setHost(process.env.GATSBY_PINHOST)
      setUsername(process.env.GATSBY_PINUSER)
      setPassword(process.env.GATSBY_PINPASS)
      setSecure(process.env.GATSBY_PINSECURE === "true")
      setLoading(true)
    } else if (pin === process.env.GATSBY_PIN2) {
      setHost(process.env.GATSBY_PINHOST)
      setUsername(process.env.GATSBY_PINUSER)
      setPassword(process.env.GATSBY_PINPASS)
      setSecure(process.env.GATSBY_PINSECURE2 === "true")
      setLoading(true)
    }
  }

  // on pathName or loading change triggers navigate()
  useEffect(() => {
    if (loading) {
      navigate()
    }
  }, [pathName, loading])

  // on data or sort change triggers buildItems()
  useEffect(() => {
    if (data.length) {
      buildItems()
    }
  }, [data, sort])

  // nukes copy-to-clipboard portal
  useEffect(() => {
    if (copyPortal) {
      setTimeout(() => setCopyPortal(false), 1200)
    }
  }, [copyPortal])

  // if acceptable login info was found and files are available to display
  if (isLoggedIn && files.length) {
    return (
      <Container style={{ width: "100%", height: "100%" }}>
        {loading ? (
          <Icon
            fitted
            circular
            size="large"
            name="circle notched"
            inverted
            loading
          />
        ) : null}
        {`   Viewing ${files.length} items in ${
          pathName === "" ? "/" : pathName
        }`}
        <TransitionablePortal
          open={copyPortal}
          transition={{ animation: "fade", duration: 600 }}
        >
          <Segment
            style={{
              left: "40%",
              position: "fixed",
              top: "50%",
              zIndex: 1000,
            }}
          >
            <Header>Copied to clipboard!</Header>
          </Segment>
        </TransitionablePortal>

        <Navigation
          sort={sort}
          setSort={setSort}
          goHome={goHome}
          goBack={goBack}
          disconnect={disconnect}
        />

        <Item.Group divided style={{ marginTop: "10px" }}>
          {files}
        </Item.Group>
        <p>{pathName}</p>
      </Container>
    )
  } else if (loading) {
    return (
      <Dimmer active size={"mini"} inverted>
        <Loader content="Loading" />
      </Dimmer>
    )
  } else {
    // Login
    return (
      <Segment placeholder>
        <Login
          error={error}
          host={host}
          setHost={setHost}
          userName={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          secure={secure}
          setSecure={setSecure}
          setLoading={setLoading}
          pin={pin}
          setPin={setPin}
          pinLogin={pinLogin}
        />

        <Responsive as={Divider} vertical minWidth={768}>
          Or
        </Responsive>
      </Segment>
    )
  }
}

export default Portal

// example formatted string:
// ftp://ftp.national-anime.com/Anime/Series/Ongoing/Itai%20no%20wa%20Iya%20nano%20de%20Bougyoryoku%20ni%20Kyokufuri%20Shitai%20to%20Omoimasu/%5BHorribleSubs%5D%20Itai%20no%20wa%20Iya%20nano%20de%20Bougyoryoku%20ni%20Kyokufuri%20Shitai%20to%20Omoimasu%20-%2002%20%5B720p%5D.mkv
