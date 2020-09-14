import { User } from "src/entities/User";
import { EmailPasswordInput } from "src/types/users";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class UsersResolver {
  @Mutation(() => User)
  async register(@Arg("options") options: EmailPasswordInput): User {
    return {};
  }
}
