// src/graphql/mutations.js
import { ICompetition } from "@/interfaces";
import { gql } from "@apollo/client";

export const CREATE_COMPETITION = gql`
  mutation CreateCompetition($input: CreateCompetitionInput!) {
    createCompetition(input: $input) {
      id
      title
      description
      startDate
      endDate
      enrolmentDeadline {
        startDate
        endDate
      }
      eligibility
      enrolmentType
      price
      mediaUrl
      submissionType
      status
      rounds {
        id
        startDate
        endDate
        title
        judgementCriteria
        roundNumber
      }
    }
  }
`;

export const UPDATE_COMPETITION = gql`
  mutation UpdateCompetition($id: ID!, $input: CreateCompetitionInput!) {
    updateCompetition(id: $id, input: $input) {
      id
      title
      description
      startDate
      endDate
      enrolmentDeadline {
        startDate
        endDate
      }
      enrolmentType
      price
      mediaUrl
      submissionType
      status
      rounds {
        id
        startDate
        endDate
        title
        description
        judgementCriteria
        roundNumber
        status
        maxScore
        judges {
          name
          firstName
          lastName
        }
        maxWinners
      }
      prizes {
        id
        position
        totalAwardws
        rewards
        title
      }
    }
  }
`;

export const UPDATE_COMPETITION_ELIGIBILITY = gql`
  mutation UpdateCompetitionEligibility($id: ID!, $eligibility: String!) {
    updateEligibility(id: $id, eligibility: $eligibility) {
      eligibility
    }
  }
`;



export const GET_COMPETITION_QUERY = gql`
  query GetCompetition($id: ID!) {
    getCompetition(id: $id) {
      id
      title
      description
      startDate
      endDate
      enrolmentDeadline {
        startDate
        endDate
      }
      enrolmentType
      price
      mediaUrl
      submissionType
      status
      eligibility
      rounds {
        id
        startDate
        endDate
        title
        description
        judgementCriteria
        roundNumber
        status
        maxScore
        judges {
          name
          firstName
          lastName
        }
        maxWinners
      }
      prizes {
        id
        position
        totalAwardws
        rewards
        title
      }
    }
  }
`;

export const GET_COMPETITIONS_QUERY = gql`
  query GetCompetitions(
    $page: PaginationInput!
    $filter: CompetitionFilterInput
  ) {
    getCompetitions(page: $page, filter: $filter) {
      competitions {
        id
        title
        description
        startDate
        endDate
        enrolmentDeadline {
          startDate
          endDate
        }
        enrolmentType
        price
        mediaUrl
        submissionType
        status
        eligibility
        rounds {
          id
          startDate
          endDate
          title
          description
          judgementCriteria
          roundNumber
          status
          maxScore
          judges {
            name
            firstName
            lastName
          }
          maxWinners
        }
        prizes {
          id
          position
          totalAwardws
          rewards
          title
        }
      }
      totalCount
    }
  }
`;

// TypeScript types for the query variables and result
export interface GetCompetitionsQueryVariables {
  page: {
    limit: number;
    page: number;
  };
  filter?: {
    isActive?: boolean;
    name?: string;
    role?: string;
  };
}

export interface GetCompetitionsQueryResponse {
  getCompetitions: {
    competitions: ICompetition[];
    totalCount: number;
  };
}
