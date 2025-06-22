import { IUser } from "@/interfaces";
import { gql } from "@apollo/client";

// Define the GraphQL query to fetch users
export const GET_USERS_QUERY = gql`
  query GetUsers($page: PaginationInput!, $filter: UserFilterInput) {
    getUsers(page: $page, filter: $filter) {
      users {
        id
        name
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

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
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
      country
      city
      state
      zipCode
      address
      dob
      gender
    }
  }
`;
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateGeneralInfo($id: ID!, $input: UpdateGeneralInfoInput!) {
    updateGeneralInfo(id: $id, input: $input) {
      user {
        id
        name
        email
        firstName
        lastName
        phoneNumber {
          countryCode
          number
        }
        isActive
        avatar
        role
        authProvider
        socialId
        country
        city
        state
        zipCode
        address
        dob
        gender
      }
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword(
    $oldPassword: String!
    $password: String!
    $confirmPassword: String!
  ) {
    updatePassword(
      oldPassword: $oldPassword
      password: $password
      confirmPassword: $confirmPassword
    ) {
      message
      success
    }
  }
`;

// TypeScript types for the query variables and result
export interface GetUsersQueryVariables {
  page: {
    limit: number;
    page: number;
  };
  filter: {
    isActive?: boolean;
    name?: string;
    role?: string;
  };
}

export interface GetUsersQueryResponse {
  getUsers: {
    users: IUser[];
    totalCount: number;
  };
}
