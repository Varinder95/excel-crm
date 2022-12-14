const { gql } = require('apollo-server');

module.exports = gql`

type User {
    _id: ID!
    name: String
    email: String!
    password: String
    token: String
    createdAt: String
}

type Uploads {
    _id: ID!
    UploadName: String
    FileName: String!
    NoOfEntries: String
    UploadedBy: String
    createdAt: String
}

type Data {
    _id: ID!
    Business: String
    Address_1: String
    Address_2: String
    Address_3: String
    County: String
    Region: String
    Postcode: String
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
    UploadName: String
    FileName: String
    CreatedBy: String
    createdAt: String
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
    Address_1: String
    Address_2: String
    Address_3: String
    County: String
    Region: String
    Postcode: String
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
    UploadName: String
    FileName: String
    CreatedBy: String
    createdAt: String
}

input UploadsInput {
    UploadName: String
    FileName: String!
    NoOfEntries: String
    UploadedBy: String
}

type Query {
    
    getUser(email: String!): User!
    getUsers: [User]
    greeting: String!
    getData: [Data]
    DataByFilename(FileName: String!): [Data]
    getUploads: [Uploads]
    getSingleUpload(FileName: String!): Uploads!
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    saveData(dataInput: DataInput): Data
    saveUploads(uploadsInput: UploadsInput): Uploads
}
`