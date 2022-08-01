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
      resolve: async (parent, args) => {
        const allUsers = await db
          .query(`SELECT COUNT(*) FROM users`)
          .then((res) => parseInt(res[0].count) + 10)
          .catch((err) => err);

        const values = [
          allUsers,
          args.firstname,
          args.lastname,
          args.email,
          args.password,
          args.gender,
        ];

        const query = `INSERT INTO users (forms_id, firstname, lastname, email, password, gender) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING forms_id, firstname, lastname, email, password, gender`;

        db.query(query, values)
          .then((res) => res)
          .then((res) => console.log(res))
          .catch((err) => err);

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
