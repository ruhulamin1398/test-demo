"use client";
import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";

export const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
