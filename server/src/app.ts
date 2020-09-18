import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import configTypeOrm from "config/configTypeOrm";
import Container from "typedi";

const main = async () => {
  const app = express();

  await configTypeOrm();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        __dirname + "/modules/**/*Resolver.{ts,js}",
        __dirname + "/resolvers/**/*.{ts,js}"
      ],
      validate: false,
      container: Container
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
