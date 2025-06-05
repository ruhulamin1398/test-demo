export const enrollmentSubmissionTypeDefs = `#graphql
  type EnrollmentSubmission {
    id: ID!
    enrolId: ID!
    roundId: ID
    userId: ID!
    score: Int!
    submittedContent: String!
    title: String
    description: String
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
  
 

`;
