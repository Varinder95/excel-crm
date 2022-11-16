const usersResolvers = require('./users');
const dataResolvers = require('./data');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...dataResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...dataResolvers.Mutation
    },
};