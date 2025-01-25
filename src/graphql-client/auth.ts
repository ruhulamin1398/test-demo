import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        firstName
        lastName
        phoneNumber {
          countryCode
          number
        }
        email
        username
        role
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation CreateUser(
    $email: String!
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: PhoneNumberInput!
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      username: $username
    ) {
      user {
        id
        firstName
        lastName
        phoneNumber {
          countryCode
          number
        }
        email
        username
      }
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      firstName
      lastName
      phoneNumber {
        countryCode
        number
      }
      email
      username
      role
    }
  }
`;
