const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  
  type Query {
    users: [User]
  }

  type Mutation {
    signup(email: String!, password: String!, firstName: String!, lastName: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default typeDefs;
