import { gql } from "@apollo/client";

export const CREATE_COMPETITION_ROUND = gql`
  mutation CreateCompetitionRound($input: CreateCompetitionRoundInput!) {
    createRound(input: $input) {
      id
      competition
      title
      description
      roundNumber
      judgementCriteria
      startDate
      submissionStartDate
      submissionEndDate
      endDate
      maxScore
      status
      isActiveRound
      judges {
        id
        name
        firstName
        lastName
      }
      maxWinners
    }
  }
`;

export const UPDATE_COMPETITION_ROUND = gql`
  mutation UpdateCompetitionRound(
    $id: ID!
    $input: CreateCompetitionRoundInput!
  ) {
    updateRound(id: $id, input: $input) {
      id
      competition
      title
      description
      roundNumber
      judgementCriteria
      startDate
      endDate
      submissionStartDate
      submissionEndDate
      maxScore
      status
      judges {
        id
        name
        firstName
        lastName
      }
      maxWinners
    }
  }
`;
