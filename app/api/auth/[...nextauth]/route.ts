import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "admin credentials",
      credentials: {
        passkey: {
          label: "Passkey",
          type: "password",
          placeholder: "pizzalicious",
        },
      },
      async authorize(credentials) {
        const user = {
          id: 'admin',
          passkey: credentials?.passkey,
        }
        return user.passkey?.includes(process.env.PASS_KEY as string)
          ? user
          : null
      },
    }),
    CredentialsProvider({
      id: "server",
      name: "server credentials",
      credentials: {
        server: {
          label: "Server",
          type: "text",
          placeholder: "ftp.example.com",
        },
        user: { label: "User", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: credentials?.user || 'server',
          server: credentials?.server,
          user: credentials?.user,
          password: credentials?.password,
        }
        return user.password?.includes(process.env.PASS_KEY as string)
          ? user
          : null
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      // if (account.provider === "discord") {

      //   // Grant access only if the member has the required role
      //   return user.isAuthorized
      // }

      // Allow sign-in for other providers
      return true
    },
    async jwt({ token, user, account, profile }: any) {
      return { ...token, ...user}
    },
    async session({ session, user, token }: any) {
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
