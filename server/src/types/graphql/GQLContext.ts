import userLoader from "loaders/usersLoader";

export default interface GQLContext {
  loaders: {
    usersLoader: ReturnType<typeof userLoader>;
  };
}
