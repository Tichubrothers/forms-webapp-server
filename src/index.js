"use strict";
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas");

require("dotenv").config();

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
