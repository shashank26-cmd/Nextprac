import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"





const handler =NextAuth({
    providers:[
        GoogleProvider({
clientId:process.env.GOOGLE_CLIENT_ID,
clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
})




// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // ...add more providers here
//   ],
// }

export { handler as GET,handler as POST }