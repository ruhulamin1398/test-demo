export const enrolmentTypeDefs = `
  type Enrolment {
    id: ID!
    competitionId: String!
    userId: User!
    enrolDate: String!
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
    ): Enrolment
    updateEnrolment(
      competitionId: ID!
    ): Enrolment
    deleteEnrolment(id: ID!): Enrolment
  }
`;
