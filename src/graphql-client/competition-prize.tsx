import { gql } from "@apollo/client";

export const CREATE_COMPETITION_PRIZE = gql`
  mutation CreateCompetitionPrize(
    $id: ID!
    $input: CreateCompetitionPrizeInput!
  ) {
    createPrize(id: $id, input: $input) {
      id
      position
      totalAwardws
      rewards
      title
    }
  }
`;

export const UPDATE_COMPETITION_PRIZE = gql`
  mutation UpdateCompetitionPrize(
    $id: ID!
    $input: CreateCompetitionPrizeInput!
  ) {
    updatePrize(id: $id, input: $input) {
      id
      position
      totalAwardws
      rewards
      title
    }
  }
`;
