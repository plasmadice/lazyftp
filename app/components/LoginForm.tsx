"use client" // do not remove this

// import useSWR from 'swr'
import React from "react"
import { getProviders, signIn } from "next-auth/react"

type LoginType = "anonymous" | "user" | "admin"

// async function fetcher<JSON = any>(
//   input: RequestInfo,
//   init?: RequestInit
// ): Promise<JSON> {
//   const res = await fetch(input, init)
//   return res.json()
// }

// function useLogin () {
//   const { data, error, isLoading } = useSWR(`/api/auth/providers`, fetcher)

//   return {
//     data,
//     isLoading,
//     isError: error
//   }
// }

export function LoginForm() {
  const [loginType, setLoginType] = React.useState<LoginType>("anonymous")
  const hostRef = React.useRef<HTMLInputElement>(null)

  const [adminPasskey, setAdminPasskey] = React.useState<string>("")
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [host, setHost] = React.useState<string>("")
  const [port, setPort] = React.useState<string>("")
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  // React.useEffect(() => {
  //   if (serverRef?.current) {
  //     serverRef.current.focus()
  //   }
  // }, [])

  React.useEffect(() => {
    if (adminPasskey.length) {
      setLoginType("admin")
    } else if (username.length) {
      setLoginType("user")
    } else {
      setLoginType("anonymous")
    }
  }, [adminPasskey, username])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let res = await signIn("server", {
      user: username,
      password,
      host,
      port,
      passkey: adminPasskey,
      redirect: false,
    })


    console.log('Response', res)
    // Set the error message if there is an error, else clear it

    if (res?.error) {
      // parse error
      let error = res?.error.includes("CredentialsSignin") ? "Invalid credentials" : res?.error
      setErrorMessage(error)
    } else {
      setErrorMessage("")
    }
  }

  const handleClear = (e: any) => {
    e.preventDefault()
    setHost("")
    setPassword("")
    setAdminPasskey("")
    setUsername("")
    setErrorMessage("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-control w-full max-w-xs space-y-4"
    >
      {/* Server login */}
      <label className="label">
        <span className="label-text">Host</span>
        <span className="label-text-alt">{`${loginType} login`}</span>
      </label>
      <input
        type="text"
        value={host}
        ref={hostRef}
        onChange={(e) => setHost(e.target.value)}
        // disabled={loginType === "admin"}
        placeholder="ftp.example.com"
        className="input input-bordered !mt-0 w-full max-w-xs"
      />

      {/* User login */}
      <div className="grid grid-cols-1 gap-2">
        <label className="label">
          <span className="label-text-alt">User</span>
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // disabled={loginType !== "user"}
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Port"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Admin login */}
      <label className="label">
        <span className="label-text-alt">Admin Passkey</span>
      </label>
      <input
        type="password"
        value={adminPasskey}
        onChange={(e) => setAdminPasskey(e.target.value)}
        // disabled={loginType !== "admin"}
        placeholder="Admin key"
        className="input input-bordered !mt-0 w-full max-w-xs"
      />
      {/* Error message */}
      {errorMessage && <div className="alert alert-warning">{errorMessage}</div>}
      <button className="btn btn-wide mx-auto bg-primary">Submit</button>
      <button
        className="btn btn-wide btn-xs mx-auto bg-secondary"
        onClick={(e) => handleClear(e)}
      >
        Clear
      </button>
    </form>
  )
}
