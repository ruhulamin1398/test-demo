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
      maxScore
      maxVote
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
      submissionType
      maxScore
      maxVote
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

export const DELETE_ROUND = gql`
  mutation DeleteRound($id: ID!) {
    deleteRound(id: $id) {
      success
      message
    }
  }
`;
