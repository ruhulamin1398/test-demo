export const roundTypeDefs = `#graphql
  enum RoundStatusEnum {
    Completed,
    Ongoing,
    Upcoming,
  }

  enum SubmissionTypeEnum {
    Photo
    Video
  }

  enum RoundJudgementCriteriaEnum {
    Public,
    Judge,
  }
  # Input type for creating a competition
  input CreateCompetitionRoundInput {
    competition: ID!
    title: String!
    description: String!
    roundNumber: Int!
    judgementCriteria: RoundJudgementCriteriaEnum!
    startDate: String!
    endDate: String!
    submissionType: SubmissionTypeEnum!
    submissionStartDate: String!
    submissionEndDate: String!
    
    maxScore: Float!
    status: RoundStatusEnum
    isActiveRound:Boolean!
    judges: [String!]
    maxWinners: Int!
  }
  type Round {
    id: ID!
    title: String!
    description: String!
    roundNumber: Int!
    judgementCriteria: String!
    startDate: String!
    endDate: String!
    submissionStartDate: String!
    submissionEndDate: String!
    maxScore: Float!
    submissionType: SubmissionTypeEnum!
    enrolledIds: [Enrolment]
    judges: [User]
    maxWinners: Int!
    competition: String!
    status: String!
    isActiveRound:Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getRounds: [Round]
    getRound(id: ID!): Round
  }

  type Mutation {
    createRound(input: CreateCompetitionRoundInput!): Round!
    updateRound(id: ID!, input: CreateCompetitionRoundInput!): Round!
    deleteRound(id: ID!): Round
  }
`;
