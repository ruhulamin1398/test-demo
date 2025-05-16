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
      haveRoundWiseSubmission
      rounds {
        id
        startDate
        endDate
        title
        judgementCriteria
        roundNumber
        maxScore
        maxVote
        submissionType
        judges {
          id
          name
          firstName
          lastName
        }
        maxWinners
        isActiveRound
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
        maxVote
        submissionType
        judges {
          id
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
      mySubmission {
        id
        score
        submittedContent
        createdAt
        updatedAt
      }
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
      haveRoundWiseSubmission
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
        maxVote
        submissionType
        judges {
          id
          name
          firstName
          lastName
        }
        maxWinners
        deadline {
          startDate
          endDate
        }
        submissionDeadline {
          startDate
          endDate
        }
        votingDeadline {
          startDate
          endDate
        }
        judgingDeadline {
          startDate
          endDate
        }
      }
      prizes {
        id
        position
        totalAwardws
        rewards
        title
      }
      isEnrolled
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
        mySubmission {
          id
          score
          submittedContent
          createdAt
          updatedAt
        }
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
        haveRoundWiseSubmission
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
          maxVote
          submissionType
          judges {
            id
            name
            firstName
            lastName
          }
          maxWinners
          isActiveRound
        }
        prizes {
          id
          position
          totalAwardws
          rewards
          title
        }
        isEnrolled
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
