import { MongooseError } from "mongoose";

export interface IResolverOperationError {
  code: string;
  message: string;
}

export const getResolverErrorMessage = (
  error: unknown
): IResolverOperationError => {
  // Handle MongoDB errors (e.g., invalid query)
  if (error instanceof MongooseError) {
    return { code: "INTERNAL_SERVER_ERROR", message: error.message };
  }

  // Handle general errors
  else if (error instanceof Error) {
    return { code: "INTERNAL_SERVER_ERROR", message: error.message };
  }

  return {
    code: "INTERNAL_SERVER_ERROR",
    message: "Something wents wrong. Please try again later.",
  };
};
