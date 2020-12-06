import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import configTypeOrm from "config/configTypeOrm";
import Container from "typedi";
import configApolloContext from "config/configApolloContext";

const { SERVER_PORT } = process.env;

const main = async () => {
  const app = express();

  await configTypeOrm();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.{ts,js}"],

      validate: false,
      container: Container
    }),
    context: configApolloContext,
    tracing: true
  });

  apolloServer.applyMiddleware({ app });

  app.listen(SERVER_PORT, () => {
    console.log(`server started on port ${SERVER_PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
