import { gql } from "@apollo/client";

// LOGIN_MUTATION: Handles login via email and password
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
        avatar
        role
        authProvider
        socialId
      }
    }
  }
`;

// REGISTER_MUTATION: Handles user registration
export const REGISTER_MUTATION = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
    $phoneNumber: PhoneNumberInput
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
    ) {
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
        avatar
        role
        authProvider
        socialId
      }
    }
  }
`;

// SOCIAL_LOGIN_MUTATION: Handles social login (Google, Facebook, etc.)
export const SOCIAL_LOGIN_MUTATION = gql`
  mutation SocialLogin(
    $socialId: String!
    $email: String!
    $firstName: String
    $lastName: String
    $phoneNumber: PhoneNumberInput
    $authProvider: AuthProviderEnum!
  ) {
    socialLogin(
      socialId: $socialId
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      authProvider: $authProvider
    ) {
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
        avatar
        role
        authProvider
        socialId
      }
    }
  }
`;

// LOGOUT_MUTATION: Handles user logout
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

// ME_QUERY: Fetches the authenticated user's details
export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      firstName
      lastName
      phoneNumber {
        countryCode
        number
      }
      avatar
      role
      authProvider
      socialId
    }
  }
`;

// GET_USERS_QUERY: Fetches a list of users with pagination and optional filters
export const GET_USERS_QUERY = gql`
  query GetUsers($page: PaginationInput!, $filter: UserFilterInput) {
    getUsers(page: $page, filter: $filter) {
      users {
        id
        name
        email
        firstName
        lastName
        phoneNumber {
          countryCode
          number
        }
        avatar
        role
        authProvider
        socialId
      }
      totalCount
    }
  }
`;

// UPDATE_PROFILE_AVATAR_MUTATION: Updates the user's avatar
export const UPDATE_PROFILE_AVATAR_MUTATION = gql`
  mutation UpdateProfileAvatar($avatarUrl: String!) {
    updateProfileAvatar(avatarUrl: $avatarUrl) {
      id
      avatar
    }
  }
`;

// UPDATE_GENERAL_INFO_MUTATION: Updates the user's general information (firstName, lastName, phoneNumber)
export const UPDATE_GENERAL_INFO_MUTATION = gql`
  mutation UpdateGeneralInfo(
    $firstName: String
    $lastName: String
    $phoneNumber: PhoneNumberInput
  ) {
    updateGeneralInfo(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
    ) {
      id
      firstName
      lastName
      phoneNumber {
        countryCode
        number
      }
    }
  }
`;

// RESET_PASSWORD_MUTATION: Resets the user's password by email
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      success
      message
    }
  }
`;

// CHANGE_PASSWORD_MUTATION: Changes the user's password
export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      success
      message
    }
  }
`;

// DELETE_USER_MUTATION: Deletes a user account
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;
