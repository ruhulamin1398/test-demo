export const competitionTypeDefs = `#graphql
  # Enums for various competition-related values
  enum CompetitionStatusEnum {
    Draft
    Active
    Finished
  }

  enum SubmissionTypeEnum {
    Photo,
    Video,
    Audio,
    Pdf,
    Link,
  }

  enum EnrollmentTypeEnum {
    Paid
    Free
  }

  # Input and Output types for EnrollmentDeadline
  type EnrollmentDeadline {
    startDate: String!
    endDate: String!
  }

  input EnrollmentDeadlineInput {
    startDate: String!
    endDate: String!
  }

  input CreateCompetitionPrizeInput {
    id: ID
    title: String!
    position: Int!
    totalAwardws: Int!
    rewards: String!
  }

  type Prize {
    id: ID!
    title: String!
    position: Int!
    totalAwardws: Int!
    rewards: String!
  }
  # Input type for creating a competition
  input CreateCompetitionInput {
    title: String!
    description: String!
    competitionDeadline: EnrollmentDeadlineInput!
    enrollmentDeadline: EnrollmentDeadlineInput!
    enrollmentType: EnrollmentTypeEnum!
    price: Float!
    mediaUrl: String
    status: CompetitionStatusEnum
    haveRoundWiseSubmission: Boolean
  }

  # User filter input
  input CompetitionFilterInput {
    isActive: Boolean
    name: String
    role: RoleEnum
  }

  # The main Competition type
  type Competition {
    id: ID!
    title: String!
    description: String!
    eligibility: String!
    enrollmentDeadline: EnrollmentDeadline!
    competitionDeadline: EnrollmentDeadline!
    enrollmentType: EnrollmentTypeEnum!
    price: Float!
    mediaUrl: String
    submissionType: SubmissionTypeEnum!
    rounds: [Round]
    status: CompetitionStatusEnum!
    createdAt: String
    updatedAt: String
    prizes: [Prize]
    haveRoundWiseSubmission: Boolean
    isEnrolled:Boolean
    mySubmission: [EnrollmentSubmission]
  }

  # Paginated response for users
  type CompetitionPage {
    competitions: [Competition!]!
    totalCount: Int!
  }

  # Queries to retrieve competition data
  type Query {
    getCompetition(id: ID!): Competition
    getCompetitions(page: PaginationInput!, filter: CompetitionFilterInput): CompetitionPage!
  }

  type UpdateEligibilityResponse {
    eligibility: String!
  }

  # Mutations to create, update, or delete competitions
  type Mutation {
    createCompetition(input: CreateCompetitionInput!): Competition!
    updateCompetition(id: ID!, input: CreateCompetitionInput!): Competition!
    deleteCompetition(id: ID!): Competition
    createPrize(id: ID!, input: CreateCompetitionPrizeInput!): [Prize!]
    updatePrize(id: ID!, input: CreateCompetitionPrizeInput!): [Prize!]
    deletePrize(id: ID!, competitionId: ID!): [Prize!]
    updateEligibility(id: ID!, eligibility: String!): UpdateEligibilityResponse!
  }

`;
