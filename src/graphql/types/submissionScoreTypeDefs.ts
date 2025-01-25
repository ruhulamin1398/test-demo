export const submissionScoreTypeDefs = `
  type SubmissionScore {
    id: ID!
    enrolId: Enrolment!
    roundId: Round!
    userId: User!
    score: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getSubmissionScores: [SubmissionScore]
    getSubmissionScore(id: ID!): SubmissionScore
  }

  type Mutation {
    createSubmissionScore(
      enrolId: ID!
      roundId: ID!
      userId: ID!
      score: Float!
    ): SubmissionScore
    updateSubmissionScore(
      id: ID!
      score: Float
    ): SubmissionScore
    deleteSubmissionScore(id: ID!): SubmissionScore
  }
`;
