import { gql } from "@apollo/client";
export const ENROLMENT_MUTATION = gql`
  mutation Login($competitionId: ID!) {
    createEnrolment(email: $email, password: $password) {
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
