import { User } from "../entities/User";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class AuthenticationResolver {
  @Query(() => User)
  user(): User {
    return {
      id: 1,
      name: "taso",
      surname: "shyti",
      email: "tasoshyti@live.com",
      password: "asdfasdf"
    };
  }
}
