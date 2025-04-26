import { gql } from "@apollo/client";

export const CREATE_ENROLMENT_MUTATION = gql`
  mutation CreateEnrollment($competitionId: ID!) {
    createEnrolment(competitionId: $competitionId) {
      EnrollmentStatus
    }
  }
`;
