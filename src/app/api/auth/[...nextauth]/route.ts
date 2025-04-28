import NextAuth, { Account, AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import { client } from "@/lib/apolloClient";
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  SOCIAL_LOGIN_MUTATION,
} from "@/graphql-client/auth";
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
        console.log("user credentials", req.body, email, password);
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: { username: email, password },
          });

          console.log("login data is ___________________", data);

          if (data?.login?.user) {
            return data.login.user;
          }
        } catch (error) {
          throw error;
        }
      },
    }),

    GoogleProvider({
      clientId:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
        "940596571861-4mfet946ugp4k480gnml58v4td8oo94o.apps.googleusercontent.com",
      clientSecret:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ||
        "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",
    }),
    GitHubProvider({
      clientId:
        process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "Ov23lik96gTaKmDVFFba",
      clientSecret:
        process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ||
        "127cd7fef32da8132641f8e2275cd3fc461e63dd",
    }),
    TwitterProvider({
      clientId:
        process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID ||
        "ZXR1TjVxamZDTzhiSHlxWW4tTVI6MTpjaQ",
      clientSecret:
        process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET ||
        "aXp9R0qXac82bpfmPuvHLlPD6lqzi6yzfBO34pjsZl7wHWAB5x",
      version: "2.0", // Twitter API v2 (for email access)
    }),
  ],
  secret:
    process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ||
    "1a99663db926903959c25fe59d333d61",
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
      console.log("token ", token, "user", user, "account ", account);
      // When the user signs in with a provider, we get an account object.
      if (account && user) {
        // Check if login was with a social provider (Google, GitHub, Twitter)
        if (account.provider !== "credentials") {
          console.log(
            " Social login mutation called +++++++++++++++__________________________"
          );
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
