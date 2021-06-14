import React, { useState, useEffect } from "react"
import {
  Button,
  Item,
  Container,
  Icon,
  Dimmer,
  Loader,
  TransitionablePortal,
  Segment,
  Header,
} from "semantic-ui-react"
import axios from "axios"
import arraySort from "array-sort"
import copy from "copy-text-to-clipboard"
import Navigation from "./navigation"
import Login from "./login"
import date from "date-and-time"

var CryptoJS = require("crypto-js")
var isVideo = require("is-video")

const Portal = () => {
  const [data, setData] = useState([])
  const [backupFiles, setBackupFiles] = useState([])
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

  // Area related to date-and-time module
  const pattern1 = date.compile("MMM DD YYYY") // MMM DD YYYY - "Dec 29 2016"
  const pattern2 = date.compile("MMM DD HH:mm") // MMM DD HH:mm - "Jan 07 22:24"
  const today = new Date()
  const currentYear = today.getFullYear()

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

    // encrypt data and send as POST
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
          let time = date.parse(item.rawModifiedAt, pattern1)
          if (isNaN(time)) {
            time = date.parse(item.rawModifiedAt, pattern2)

            // issue caused by timestamps without a year / likely modified in last 6 months (180 days)
            if (time.getFullYear() === 1970) {
              // If less than 180 days has passed since modified
              // sets year and tests if valid
              time.setFullYear(currentYear)
              if (date.subtract(today, time).toDays() > parseFloat(-180)) {
              } else {
                time.setFullYear(currentYear - 1)
              }
            }
          }

          return {
            name: item.name,
            type: item.type,
            date: item.rawModifiedAt,
            size: item.size,
            lastModified: time.getTime(),
          }
        })

        // prepares data, this triggers a buildItems()
        setData(items)
        // ends the load screen animation (if it's visible)
        setLoading(false)
        setError(false)
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
      if (0 === a) return "0 Bytes"
      var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c))
      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    }

    // sorts items based on sort variable

    // MMM DD h:mm A (momentjs format)
    if (sort === "A-Z (Default)") {
      items = arraySort(data, "name")
    } else if (sort === "Z-A") {
      items = arraySort(data, "name", { reverse: true })
    } else if (sort === "Oldest") {
      items = arraySort(data, "lastModified")
    } else if (sort === "Newest") {
      items = arraySort(data, "lastModified", { reverse: true })
    }

    // Makes an <Item /> for every item
    const preparedItems = items.map((item, index) => {
      const copyPath = `ftp://${username}:${password}@${host}${pathName}/${item.name}`

      const linkPath = `ftp://${username}:${password}@${host}${encodeURI(
        pathName
      )}/${encodeURIComponent(item.name)}`

      return (
        <Item
          key={index}
          name={item.name}
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "1px 1000px",
          }}
        >
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
              ) : isVideo(item.name) ? (
                <Icon name="video camera" />
              ) : (
                <Icon name="zip" />
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
                  copy(linkPath)
                }}
              >
                <Icon color="black" name="copy" />
                Copy FTP Path
              </Button>
              {item.type !== 2 ? ( // show download button if item != folder
                <>
                  <Button
                    as="a"
                    negative
                    rel="noopener"
                    rel="noreferrer"
                    href={linkPath}
                    target="_blank"
                    download
                    size="mini"
                    icon
                    labelPosition="left"
                  >
                    Download (experimental)
                    <Icon color="black" name="download" />
                  </Button>
                  <Button
                    color="teal"
                    target="_blank"
                    size="mini"
                    icon
                    labelPosition="left"
                    onClick={() => {
                      // opens a new window to attempt to download the item
                      if (window) {
                        let newWindow = window.open(linkPath, "_blank")

                        // Generates countdown that closes window
                        newWindow.count = 3

                        const message = newWindow.document.createElement("h1")
                        message.innerHTML = `This window should have auto-closed... closing in ${newWindow.count}`

                        newWindow.document.body.appendChild(message)

                        const updateClock = () => {
                          if (newWindow.count > 0) {
                            newWindow.count--
                            message.innerHTML = `This window should have auto closed... closing in ${newWindow.count}`
                          } else {
                            newWindow.close()
                          }
                        }

                        newWindow.setInterval(() => updateClock(), 1000)
                      }
                    }}
                  >
                    Download (2)
                    <Icon color="black" name="download" />
                  </Button>
                </>
              ) : null}
              {isVideo(item.name) ? (
                <Button size="mini" icon labelPosition="left" color="orange">
                  Right-Click to Open in VLC
                  <Icon name="video" />
                  <video
                    style={{
                      position: "absolute",
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      left: "0px",
                      top: "0px",
                    }}
                  >
                    <source src={linkPath} type="video/mp4" />
                    <track kind="captions" label="Click here to open in VLC" />
                  </video>
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

    // rewrites files object and creates backup for search reset
    setBackupFiles(preparedItems)
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
    setHost("")
    setUsername("")
    setPassword("")
    setPin("")
    setSecure(false)
    setSort("A-Z (Default)")
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
      setSort("Newest")
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      navigate()
    }
  }, [pathName, loading])

  // on data or sort change triggers buildItems()
  useEffect(() => {
    if (data.length) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Container style={{ width: "100%", height: "100%", marginTop: "1rem" }}>
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
        <TransitionablePortal
          open={loading}
          transition={{ animation: "fade", duration: 600 }}
        >
          <Segment
            compact
            circular
            secondary
            style={{
              left: "50%",
              top: "50%",
              position: "absolute",
              zIndex: 1000,
            }}
          >
            <Icon
              fitted
              bordered
              circular
              inverted
              loading
              size="large"
              name="cloud"
            />
          </Segment>
        </TransitionablePortal>

        <Navigation
          sort={sort}
          setSort={setSort}
          goHome={goHome}
          goBack={goBack}
          disconnect={disconnect}
          files={files}
          setFiles={setFiles}
          backupFiles={backupFiles}
        />

        <Item.Group divided style={{ height: "75vh", overflowY: "auto" }}>
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
      <Segment
        compact
        raised
        floated={"right"}
        placeholder
        style={{ minHeight: "13rem", margin: "4rem 4rem 0 0" }}
      >
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
      </Segment>
    )
  }
}

export default Portal
