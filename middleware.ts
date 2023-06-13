export { default } from "next-auth/middleware"

// prevent users from accessing /portal without being authenticated
export const config = { matcher: ["/portal", "/files"] }