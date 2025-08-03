import NextAuth, { Account, AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { client } from "@/lib/apolloClient";
import { LOGIN_MUTATION, SOCIAL_LOGIN_MUTATION } from "@/graphql-client/auth";
import { AuthProviderEnum, IUser } from "@/interfaces";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
// Import Apollo Client for GraphQL mutation
interface PhoneNumberInput {
  countryCode: string;
  number: string;
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      id: "credentials",
      credentials: {},
      async authorize(_credentials, req) {
        const { email, password } = req.body as {
          email: string;
          password: string;
        };
        try {
          console.log(
            "login data is ___________________",
            { email, password },
            process.env.GRAPHQL_API_URL,
            client
          );
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: { username: email, password },
          });

          if (data?.login?.user) {
            return data.login.user;
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    // The jwt callback is called whenever a token is created or updated.
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
    }) {
      // When the user signs in with a provider, we get an account object.
      if (account && user) {
        // Check if login was with a social provider (Google, GitHub, Twitter)
        if (account.provider !== "credentials") {
          const email = user.email;
          const [firstName = "", lastName = ""] = user.name?.split(" ") || [];
          const socialId = user.id;
          const phoneNumber: PhoneNumberInput = {
            countryCode: "+880",
            number: "01852525225",
          };

          try {
            const authProvider: AuthProviderEnum = AuthProviderEnum.GOOGLE; // You can map account.provider to AuthProviderEnum properly here
            const { data } = await client.mutate({
              mutation: SOCIAL_LOGIN_MUTATION,
              variables: {
                socialId: socialId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                authProvider: authProvider,
              },
            });

            if (data?.socialLogin?.user) {
              token.user = data.socialLogin.user;
            }
          } catch (error) {
            console.error("Error calling social login mutation:", error);
          }
        } else {
          // For credentials login, user info already handled in authorize()
          token.user = user;
        }
      }

      return token;
    },
    async session({ session, token }) {
      const { user } = session;
      if (user) {
        const { user: tokenUser } = token;
        if (!tokenUser) return session;
        const { id, name, email, role } = tokenUser as IUser;
        session.user = {
          ...session.user,
          id,
          name,
          email,
          role,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/error",
    verifyRequest: "/auth/verify-request",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
