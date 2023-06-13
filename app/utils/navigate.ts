import { Payload } from "@/app/types"

export const getDirectory = async (payload: Payload) => {
  const { ftpHost, ftpUser, ftpPassword, ftpSecure, path } = payload

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/navigate`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({ ftpHost, ftpUser, ftpPassword, ftpSecure, path }),
  })
  return res
}

// const res = await navigate(`${process.env.NEXT_PUBLIC_URL}/api/navigate`)
// const data = await res.json()
