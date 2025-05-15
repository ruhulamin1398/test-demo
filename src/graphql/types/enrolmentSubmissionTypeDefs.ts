export const enrolmentSubmissionTypeDefs = `#graphql
  type EnrolmentSubmission {
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
    GetActiveRoundSubmission(competitionId: ID!): EnrolmentSubmission
  }
 
  enum SubmissionTypeEnum {
    Photo,
    Video,
    Audio,
    Pdf,
    Link,
  }
  
 

`;
