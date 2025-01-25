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

export const Provider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({
    link: from([
      customLink, // Add custom link with headers
      createUploadLink({
        uri: "/api/graphql",
      }),
    ]),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
