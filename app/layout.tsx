import "./globals.css"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import AuthContext from "./AuthContext"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LazFTP remake",
  description: "WiP",
}

const getSession = async () => {
  const session = await getServerSession(authOptions)
  return session
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <html lang="en">
      <AuthContext session={session}>
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </AuthContext>
    </html>
  )
}
