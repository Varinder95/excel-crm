const { gql } = require('apollo-server');

module.exports = gql`

type User {
    _id: ID!
    name: String
    email: String!
    password: String
    token: String
}

type Data {
    _id: ID!
    Business: String
    Address: String	
    Supplier: String
    Decision_Maker: String
    Telephone_1: String
    Telephone_2: String
    PC: String	
    MTC: String
    LLF: String
    MPRN: String
    MPAN: String
    EAC: String
    CED: String
}

input RegisterInput {
    name: String
    email: String
    password: String
}

input LoginInput {
    email: String
    password: String
}

input DataInput {
    Business: String!
    Address: String	
    Supplier: String
    Decision_Maker: String
    Telephone_1: String
    Telephone_2: String
    PC: String	
    MTC: String
    LLF: String
    MPRN: String
    MPAN: String
    EAC: String
    CED: String
}

type Query {
    
    getUser(email: String!): User!
    users: [User]
    greeting: String!
    getData: [Data]
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    saveData(dataInput: DataInput): Data
}
`