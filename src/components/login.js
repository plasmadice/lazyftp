import React from "react"
import {
  Grid,
  Form,
  Button,
  Responsive,
  Checkbox,
  Message,
} from "semantic-ui-react"

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
  return (
    <Grid columns={2} relaxed="very" stackable>
      <Grid.Column>
        <Form error={error} onSubmit={() => setLoading(true)}>
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
            onChange={(e) => setPin(e.target.value)}
          />
        </Form>
        <Button content="Pin Access" color="teal" onClick={() => pinLogin()} />
      </Grid.Column>
    </Grid>
  )
}

export default Login
