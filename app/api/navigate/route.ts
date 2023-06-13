import { NextResponse } from "next/server"
import { Payload } from "@/app/types"
import ftp from "basic-ftp"

export async function POST(request: Request) {
  const res: Payload = await request.json()
  const { ftpHost, ftpUser, ftpPassword, ftpSecure, path } = res

  if (
    !ftpHost ||
    !ftpUser ||
    !ftpPassword ||
    ftpSecure === undefined ||
    !path
  ) {
    return NextResponse.json(
      {
        error: "Insufficient parameters",
        description: `Issue with data sent to server.`,
      },
      { status: 400 }
    )
  }

  try {
    const client = new ftp.Client()

    await client.access({
      host: ftpHost,
      user: ftpUser,
      password: ftpPassword,
      secure: ftpSecure,
    })

    // client.lastAccessed = new Date().getTime()

    // clients[ftpHost + ftpUser] = client

    const list = await client.list(path)
    return NextResponse.json(list)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        // description: `Error while searching: ${query}`,
      },
      { status: 500 }
    )
  }
}
