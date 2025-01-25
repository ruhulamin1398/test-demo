export const uploadTpeDefs = `#graphql
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Mutation {
    uploadCompetitionThubmnail(file: Upload!, id: String!): Competition!
    submitCompetitionPhoto(file: Upload!, id: String!): Competition!
  }
`;
