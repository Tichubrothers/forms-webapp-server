"use strict";
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas");
const { db } = require("./db");

require("dotenv").config();

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// db.query("select * from users").then((res) => {
//   console.log(res);
// });

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
