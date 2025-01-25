import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables force-fetching on the server
    link: new HttpLink({
      uri: "http://localhost:3000/api/graphql", // Point to the Next.js API route
      credentials: "include", // Important: Ensures cookies are sent
    }),
    cache: new InMemoryCache(),
  });
};

export const client = createApolloClient();
