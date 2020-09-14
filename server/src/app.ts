import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthenticationResolver } from "./resolvers/authenticationResolver";
import { UsersResolver } from "./resolvers/usersResolver";

import { configTypeOrm } from "./config/typeormConfig";

const main = async () => {
  const app = express();

  await configTypeOrm();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthenticationResolver, UsersResolver],
      validate: false
    })
  });

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.SERVER_PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
