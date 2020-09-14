import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthenticationResolver } from "./resolvers/authenticationResolver";
import { createConnection } from "typeorm";

const main = async () => {
  const app = express();

  console.log(process.env.DB_IP);

  await createConnection({
    type: "mssql",
    host: process.env.DB_IP,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    logging: true
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthenticationResolver],
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
