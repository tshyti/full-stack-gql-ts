import { ApolloServerExpressConfig } from "apollo-server-express";
import usersLoader from "loaders/usersLoader";
import GQLContext from "types/graphql/GQLContext";

export default function configApolloContext(
  _: ApolloServerExpressConfig
): GQLContext {
  return {
    loaders: {
      usersLoader: usersLoader()
    }
  };
}
