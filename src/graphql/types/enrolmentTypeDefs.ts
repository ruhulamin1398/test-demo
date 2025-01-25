export const enrolmentTypeDefs = `
  type Enrolment {
    id: ID!
    competitionId: Competition!
    userId: User!
    enrolDate: String!
    mediaUrl: String!
    submissionType: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getEnrolments: [Enrolment]
    getEnrolment(id: ID!): Enrolment
  }

  type Mutation {
    createEnrolment(
      competitionId: ID!
      userId: ID!
      mediaUrl: String!
      submissionType: String!
    ): Enrolment
    updateEnrolment(
      id: ID!
      mediaUrl: String
      submissionType: String
      status: String
    ): Enrolment
    deleteEnrolment(id: ID!): Enrolment
  }
`;
