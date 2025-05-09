import { gql } from "@apollo/client";

export const GET_ACTIVE_ROUND_SUBMISSION_QUERY = gql`
  query GetActiveRoundSubmission($competitionId: ID!) {
    GetActiveRoundSubmission(competitionId: $competitionId) {
      id
      userId
      enrolId
      submittedContent
      score
      createdAt
      updatedAt
    }
  }
`;
