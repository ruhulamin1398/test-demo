import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import fetch from "cross-fetch";

const isServer = typeof window === "undefined";

// Create custom Apollo Link to set the required headers
const customLink = new ApolloLink((operation, forward) => {
  // Set the operation name header
  operation.setContext({
    headers: {
      "Apollo-Require-Preflight": "true", // Ensures preflight request handling
      "x-apollo-operation-name": operation.operationName, // Ensure operation name is set
    },
  });

  return forward(operation);
});

const createApolloClient = () => {
  const apiUri = isServer
    ? process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql"
    : "/api/graphql"; // relative path for browser

  console.log("CLIETN URL", apiUri);
  return new ApolloClient({
    link: from([
      customLink, // Add custom link with headers
      new HttpLink({
        uri: apiUri,
        fetch,
      }),
    ]),
    cache: new InMemoryCache(),
  });
};

export const client = createApolloClient();
