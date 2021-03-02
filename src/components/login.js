import React, { useState, useRef, useEffect } from "react"
import { Form, Button, Checkbox, Message, Ref } from "semantic-ui-react"

const Login = ({
  error,
  host,
  setHost,
  username,
  setUsername,
  password,
  setPassword,
  secure,
  setSecure,
  setLoading,
  pin,
  setPin,
  pinLogin,
}) => {
  const [admin, setAdmin] = useState(false)
  const inputRef = useRef(null)

  const login = () => {
    if (!admin) {
      setLoading(true)
    } else {
      pinLogin()
    }
  }

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.querySelector("input").focus()
    }
  }, [admin, inputRef])

  return (
    <>
      <Form error={error} onSubmit={() => login()}>
        {!admin ? (
          <>
            <Form.Input
              icon="cloud"
              iconPosition="left"
              label="Server Address"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Field
              control={Checkbox}
              label="Use FTPES/TLS encryption"
              onChange={() => setSecure(!secure)}
              checked={secure}
              style={{ textAlign: "center" }}
            />
          </>
        ) : (
          <>
            <Ref innerRef={inputRef}>
              <Form.Input
                className="adminInput"
                icon="lock"
                iconPosition="left"
                label="Admin Access"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </Ref>
          </>
        )}

        <Form.Field
          control={Checkbox}
          label="Admin Portal"
          onChange={() => setAdmin(!admin)}
          checked={admin}
          style={{ textAlign: "center" }}
        />
        <Button color="blue" onClick={() => login()}>
          Login
        </Button>
        <Message
          error
          size="small"
          compact
          header="Failed Login"
          content="Host server rejected connection or server was not found"
        />
      </Form>
    </>
  )
}

export default Login
