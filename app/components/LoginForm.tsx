"use client" // do not remove this

import React from "react"
import { getProviders, signIn } from "next-auth/react"

type LoginType = "anonymous" | "user" | "admin"

export function LoginForm() {
  const [loginType, setLoginType] = React.useState<LoginType>("anonymous")
  const passkeyRef = React.useRef<HTMLInputElement>(null)
  const serverRef = React.useRef<HTMLInputElement>(null)
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    
    if (loginType=== "admin") {
      passkeyRef.current!.focus()
    } else if (loginType === "anonymous" || loginType === "user") {
      serverRef.current!.focus()
    }
    
  }, [loginType])

  // const toggle = () => {
  //   setIsUserLogin((prev) => {
  //     if (prev) {
  //       passkeyRef.current!.value = ""
  //       usernameRef.current!.value = ""
  //       passwordRef.current!.value = ""
  //     }
  //     return !prev
  //   })
  // }

  const handleLoginTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setLoginType(e.target.value as LoginType)
  }

  console.log("log in form")
  console.log('loginType === "anonymous"', loginType === "anonymous")
  console.log('loginType === "user"', loginType === "user")
  console.log('loginType === "admin"', loginType === "admin")

  return (
    <div className="form-control w-full max-w-xs">
      {/* Radio Buttons */}
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Anonymous Login</span>
          <input
            type="radio"
            name="login-types"
            value="anonymous"
            className="radio checked:bg-red-500"
            checked={loginType === "anonymous"}
            onChange={handleLoginTypeChange}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">User Login</span>
          <input
            type="radio"
            name="login-types"
            value="user"
            className="radio checked:bg-blue-500"
            checked={loginType === "user"}
            onChange={handleLoginTypeChange}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Admin Login</span>
          <input
            type="radio"
            name="login-types"
            value="admin"
            className="radio checked:bg-green-500"
            checked={loginType === "admin"}
            onChange={handleLoginTypeChange}
          />
        </label>
      </div>

      {/* Server login */}
      <label className="label">
        <span className="label-text">Server Address</span>
        <span className="label-text-alt">
          {`${loginType} login`}
        </span>
      </label>
      <input
        ref={serverRef}
        type="text"
        disabled={loginType === "admin"}
        placeholder="ftp.example.com"
        className="input input-bordered w-full max-w-xs"
      />

      {/* User login */}
      <div>
        <label className="label">
          <span className="label-text-alt">User</span>
        </label>
        <input
          ref={usernameRef}
          type="text"
          disabled={loginType !== "user"}
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          ref={passwordRef}
          type="password"
          disabled={loginType !== "user"}
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Admin login */}
      <label className="label">
        <span className="label-text-alt">Admin Passkey</span>
      </label>
      <input
        ref={passkeyRef}
        type="text"
        disabled={loginType !== "admin"}
        placeholder="Admin key"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  )
}
