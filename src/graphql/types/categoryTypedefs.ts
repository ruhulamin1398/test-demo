export const categoryTypeDefs = `#graphql
    type Category {
        id: ID!
        name: String!
        slug: String
        description: String
        createdAt: String!
        updatedAt: String!
    }

    # Input for creating a category
    input CreateCategoryInput {
        name: String!
        description: String
    }

    # Input for updating a category
    input UpdateCategoryInput {
        id: ID!
        name: String
        description: String
    }

    # Mutation responses
    type DeleteResponse {
        success: Boolean!
        message: String
    }

    type Query {
        categories: [Category!]!
        category(id: ID!): Category
    }

    # Root Mutation type
    type Mutation {
        createCategory(input: CreateCategoryInput!): Category!
        updateCategory(input: UpdateCategoryInput!): Category!
        deleteCategory(id: ID!): DeleteResponse!
    }
`;
