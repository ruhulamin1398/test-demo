export const enrollmentTypeDefs = `#graphql
  type Enrollment {
    id: ID!
    competitionId: String!
    userId: User!
    enrolDate: String!
    status: String!
    createdAt: String!
    updatedAt: String!
    competition: Competition!
  }
  type Query {
    getEnrollments: [Enrollment]
    getEnrollment(id: ID!): Enrollment
  }

  type Mutation {
    createEnrollment(
      competitionId: ID!
    ): Enrollment
    updateEnrollment(
      competitionId: ID!
    ): Enrollment
    deleteEnrollment(id: ID!): Enrollment
  }
`;
