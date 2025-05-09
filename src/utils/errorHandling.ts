import { ApolloError, ServerError } from "@apollo/client";
import { GraphQLFormattedError } from "graphql";

export const handleGraphQLError = (error: unknown): string => {
  // Check if it's an ApolloError
  if (isApolloError(error)) {
    console.error("ApolloError Debug Info:", error);

    // Handle network errors
    if (error.networkError) {
      const networkErrorMessage = extractNetworkErrorMessage(
        error.networkError
      );
      return networkErrorMessage || "Please check your connection.";
    }

    // Handle GraphQL errors
    if (error.graphQLErrors.length > 0) {
      return error.graphQLErrors.map(formatGraphQLError).join(", ");
    }
  }

  // Log unknown error types for debugging
  console.error("Unknown Error Debug Info:", error);
  return "An unknown error occurred.";
};

// Extract error message from network error
const extractNetworkErrorMessage = (
  networkError: unknown
): string | undefined => {
  if (isServerError(networkError) && hasErrorsInResult(networkError.result)) {
    return networkError.result.errors[0]?.message || networkError.message;
  }
  return undefined;
};

// Type guard for ApolloError
const isApolloError = (error: unknown): error is ApolloError => {
  return isObject(error) && "graphQLErrors" in error && "networkError" in error;
};

// Type guard for ServerError
const isServerError = (error: unknown): error is ServerError => {
  return isObject(error) && "result" in error && "statusCode" in error;
};

// Type guard to check if result contains errors
const hasErrorsInResult = (
  result: unknown
): result is { errors: { message: string }[] } => {
  return (
    isObject(result) && Array.isArray((result as Record<string, any>).errors)
  );
};

// Helper to check if an object is non-null
const isObject = (value: unknown): value is Record<string, any> => {
  return typeof value === "object" && value !== null;
};

// Format GraphQL error message with optional code and path
const formatGraphQLError = (error: GraphQLFormattedError): string => {
  const message = error.message || "An error occurred.";
  const code = error.extensions?.code
    ? ` (Code: ${error.extensions.code})`
    : "";
  const path = error.path ? ` at ${error.path.join(" > ")}` : "";
  return `${message}`.trim();
  // return `${message}${code}${path}`.trim();
};
