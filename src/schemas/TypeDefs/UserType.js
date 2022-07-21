const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    forms_id: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});

module.exports = UserType;
