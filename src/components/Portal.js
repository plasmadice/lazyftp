import React, { useState, useEffect } from "react"
import {
  Button,
  Item,
  Container,
  Icon,
  Dimmer,
  Loader,
  Dropdown,
  Menu,
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
import SimpleCrypto from "simple-crypto-js"

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

    var simpleCrypto = new SimpleCrypto(process.env.GATSBY_PASSWORD)
    var cipherText = simpleCrypto.encrypt(JSON.stringify(data))

    axios({
      method: "post",
      url: `${url}/navigate`,
      data: {
        cipherText,
      },
    })
      .then(res => {
        const items = res.data.map(item => {
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
      .catch(() => {
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
      return (
        <Item key={index} name={item.name}>
          <Item.Content>
            <Item.Header
              as="a"
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
                Copy URI
                <Icon color="black" name="chain" />
              </Button>
              {item.type !== 2 ? (
                <Button
                  size="mini"
                  icon
                  labelPosition="left"
                  as="a"
                  href={copyPath}
                  download={item.name}
                >
                  Download
                  <Icon color="black" name="download" />
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
      ftpUser: username,
    }

    var simpleCrypto = new SimpleCrypto(process.env.GATSBY_PASSWORD)
    var cipherText = simpleCrypto.encrypt(JSON.stringify(data))

    // logs user out from backend if still logged in
    axios({
      method: "post",
      url: `${url}/disconnect`,
      data: {
        cipherText,
      },
    })
    setIsLoggedIn(false)
    setPathName("")
  }

  // sort menu (changes to sort state triggers buildItems())
  const sortNameAscending = () => {
    setSort("A-Z (Default)")
  }
  const sortNameDescending = () => {
    setSort("Z-A")
  }
  const sortDateAscending = () => {
    setSort("Oldest")
  }
  const sortDateDescending = () => {
    setSort("Newest")
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
        ) : (
          <Icon fitted circular size="large" name="circle notched" />
        )}
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
        <Grid
          stackable
          columns={2}
          textAlign="center"
          style={{
            maxHeight: "15vh",
            pointerEvents: "none",
            margin: "10px auto 50px auto",
          }}
        >
          <Grid.Row>
            <Grid.Column>
              <Button.Group floated="left" style={{ pointerEvents: "auto" }}>
                <Button color="grey" onClick={() => goHome()}>
                  Home
                </Button>
                <Button color="grey" onClick={() => goBack()}>
                  Back
                </Button>
                <Button color="black" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column>
              <Menu floated="right" compact style={{ pointerEvents: "auto" }}>
                <Dropdown item text={`Sort By: ${sort}`}>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => sortNameAscending()}>
                      A-Z (Default)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sortNameDescending()}>
                      Z-A
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sortDateAscending()}>
                      Oldest
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sortDateDescending()}>
                      Newest
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Item.Group divided style={{ marginTop: "10px" }}>
          {files}
        </Item.Group>
        <p>{pathName}</p>
      </Container>
    )
  } else if (loading) {
    // if loading is true (doesn't always work) TODO: fix
    return (
      <Dimmer active size={"mini"} inverted>
        <Loader content="Loading" />
      </Dimmer>
    )
  } else {
    // Login
    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form error={error} onSubmit={() => setLoading(true)}>
              <Form.Input
                icon="cloud"
                iconPosition="left"
                label="Server Address"
                value={host}
                onChange={e => setHost(e.target.value)}
              />
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Username"
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Form.Field
                control={Checkbox}
                label="Use FTPES/TLS encryption"
                onChange={() => setSecure(!secure)}
                checked={secure}
                style={{ textAlign: "center" }}
              />
              <Message
                error
                header="Failed Login"
                content="Host server rejected connection or server was not found"
              />
              <Button color="blue" onClick={() => setLoading(true)}>
                Login
              </Button>
            </Form>
          </Grid.Column>

          <Responsive style={{ margin: "auto" }} as={"h4"} maxWidth={767}>
            -OR-
          </Responsive>

          <Grid.Column verticalAlign="middle">
            <Form onSubmit={() => pinLogin()}>
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Admin Access"
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value)}
              />
            </Form>
            <Button
              content="Pin Access"
              color="teal"
              onClick={() => pinLogin()}
            />
          </Grid.Column>
        </Grid>

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
