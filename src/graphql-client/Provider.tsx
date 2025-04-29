"use client";
import React, { ReactNode } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

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

export const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({
    link: from([
      customLink, // Add custom link with headers
      createUploadLink({
        uri: isServer ? process.env.GRAPHQL_API_URL_SERVER : "/api/graphql",
      }),
    ]),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
