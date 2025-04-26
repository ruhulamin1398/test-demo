import { gql } from "@apollo/client";
export const ENROLMENT_MUTATION = gql`
  mutation Enroll($competitionId: ID!) {
    createEnrolment(competitionId: $competitionId) {
      id
    }
  }
`;
