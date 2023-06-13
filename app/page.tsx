import { getDirectory } from "@/app/utils"
import type { Payload } from "@/app/types"
// import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { LoginForm } from "@components"

export default function Home() {
  console.log('log in main page')
  // const session = await getServerSession(authOptions)

  // if (session) {
  //   // const payload: Payload = {
  //   //   ftpHost: process.env.FTP_HOST as string,
  //   //   ftpUser: process.env.FTP_USER as string,
  //   //   ftpPassword: process.env.FTP_PASSWORD as string,
  //   //   ftpSecure: false,
  //   //   path: "/",
  //   // }
  //   // const res = await getDirectory(payload)

  //   // console.log("Response", res)
  //   console.log('Session', session)
  // } else {
  //   console.log("No session")
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  )
}
