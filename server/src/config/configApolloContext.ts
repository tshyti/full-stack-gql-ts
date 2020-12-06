import { ApolloServerExpressConfig } from "apollo-server-express";
import userLoader from "loaders/UserLoader";
import GQLContext from "types/graphql/GQLContext";

export default function configApolloContext(
  _: ApolloServerExpressConfig
): GQLContext {
  return {
    loaders: {
      userLoader: userLoader()
    }
  };
}
