export const roundTypeDefs = `#graphql
  enum RoundStatusEnum {
    Completed,
    Ongoing,
    Upcoming,
  }

  enum SubmissionTypeEnum {
    Photo,
    Video,
    Audio,
    Pdf,
    Link,
  }
  enum RoundJudgementCriteriaEnum {
    Public,
    Judge,
    Both,
  }
  input Deadline {
    startDate: String!
    endDate: String!
  }
  # Input type for creating a competition
  input CreateCompetitionRoundInput {
    competition: ID!
    title: String!
    description: String!
    roundNumber: Int!
    judgementCriteria: RoundJudgementCriteriaEnum!
    deadline: Deadline
    submissionDeadline: Deadline
    votingDeadline: Deadline
    judgingDeadline: Deadline
    submissionType: SubmissionTypeEnum!
    maxScore: Float!
    maxVote: Float!
    status: RoundStatusEnum
    judges: [String!]
    maxWinners: Int!
  }
  type RoundDeadlines {
    startDate: String!
    endDate: String!
  }
  type Round {
    id: ID!
    title: String!
    description: String!
    roundNumber: Int!
    judgementCriteria: String!
    deadline: RoundDeadlines
    submissionDeadline: RoundDeadlines
    votingDeadline: RoundDeadlines
    judgingDeadline: RoundDeadlines
    maxVote: Float!
    submissionType: SubmissionTypeEnum!
    enrolledIds: [Enrollment]
    judges: [User]
    maxWinners: Int!
    competition: String!
    status: String!
    createdAt: String!
    updatedAt: String!
    maxScore: Float!
  }

  type Query {
    getRounds: [Round]
    getRound(id: ID!): Round
  }

  type Mutation {
    createRound(input: CreateCompetitionRoundInput!): Round!
    updateRound(id: ID!, input: CreateCompetitionRoundInput!): Round!
    deleteRound(id: ID!): DeleteResponse
  }
`;
