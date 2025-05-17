export const enrollmentSubmissionTypeDefs = `#graphql
  type EnrollmentSubmission {
    id: ID!
    enrolId: ID!
    roundId: Round
    userId: ID!
    score: Int!
    submittedContent: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    GetActiveRoundSubmission(competitionId: ID!): EnrollmentSubmission
  }
 
  enum SubmissionTypeEnum {
    Photo,
    Video,
    Audio,
    Pdf,
    Link,
  }
  
  type Round {
  id: ID!
  title: String
  submissionType: SubmissionTypeEnum!
  startDate: String
  endDate: String
  submissionStartDate: String
  submissionEndDate: String
}

`;
