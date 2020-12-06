import userLoader from "loaders/userLoader";

export default interface GQLContext {
  loaders: {
    userLoader: ReturnType<typeof userLoader>;
  };
}
