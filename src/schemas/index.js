const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const UserType = require("./TypeDefs/UserType");
// const userData = require("../db/MOCK_DATA.json");
const { db } = require("../db");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: () => ({
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        // return userData;
        const userData = db
          .query(`SELECT * FROM users`)
          .then((res) => res)
          .catch((err) => err);
        return userData;
      },
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        gender: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        // debugger.query("INSERT")
        userData.push({
          forms_id: userData.length + 1,
          firstname: args.firstName,
          lastname: args.lastName,
          email: args.email,
          password: args.password,
          gender: args.gender,
        });
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
