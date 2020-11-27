import { Users } from "entities/Users";
import { UsersService } from "services/usersService";
import { RegisterUserDTO } from "types/users";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Inject } from "typedi";

@Resolver()
export class UsersResolver {
  @Inject()
  readonly usersService: UsersService;

  @Mutation(() => Users)
  async register(@Arg("options") options: RegisterUserDTO): Promise<Users> {
    return this.usersService.createUser(options);
  }

  @Query(() => Users, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<Users | undefined> {
    return this.usersService.getUserById(id);
  }
}
