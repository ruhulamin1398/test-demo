import { IUser } from "@/interfaces";
import { gql } from "@apollo/client";

// Define the GraphQL query to fetch users
export const GET_USERS_QUERY = gql`
  query GetUsers($page: PaginationInput!, $filter: UserFilterInput) {
    getUsers(page: $page, filter: $filter) {
      users {
        id
        username
        email
        firstName
        lastName
        role
        isActive
        avatar
        phoneNumber {
          countryCode
          number
        }
      }
      totalCount
    }
  }
`;

// TypeScript types for the query variables and result
export interface GetUsersQueryVariables {
  page: {
    limit: number;
    page: number;
  };
  filter?: {
    isActive?: boolean;
    username?: string;
    role?: string;
  };
}

export interface GetUsersQueryResponse {
  getUsers: {
    users: IUser[];
    totalCount: number;
  };
}
