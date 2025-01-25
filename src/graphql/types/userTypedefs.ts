export const userTypeDefs = `#graphql

# Enum for user roles
enum RoleEnum {
  admin
  user
  moderator
}

# Phone number type
type PhoneNumber {
  countryCode: String!
  number: String!
}

# Authentication response for logged-in user
type AuthUser {
  user: User
}

# Response type for logout
type LogoutResponse {
  success: Boolean
}

# User type
type User {
  id: ID!
  username: String!
  email: String!
  firstName: String
  lastName: String
  phoneNumber: PhoneNumber!
  createdAt: String!
  isActive: Boolean!
  avatar: String
  role: RoleEnum
}

# Pagination input type
input PaginationInput {
  page: Int!
  limit: Int!
}

# User filter input
input UserFilterInput {
  isActive: Boolean
  username: String
  role: RoleEnum
}

# Paginated response for users
type UserPage {
  users: [User!]!
  totalCount: Int!
}

# Queries
type Query {
  me: User
  getUsers(page: PaginationInput!, filter: UserFilterInput): UserPage!
}

# Mutations
type Mutation {
  createUser(
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    phoneNumber: PhoneNumberInput
  ): AuthUser!
  updateProfileAvatar(avatarUrl: String!): User!
  updateGeneralInfo(firstName: String, lastName: String, phoneNumber: PhoneNumberInput): User!
  login(username: String!, password: String!): AuthUser!
  logout: LogoutResponse!
}

# Input for phone number (used for mutations like createUser or updateGeneralInfo)
input PhoneNumberInput {
  countryCode: String!
  number: String!
}
`;
