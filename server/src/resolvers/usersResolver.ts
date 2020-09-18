import { User } from "entities/User";
import { UsersService } from "services/usersService";
import { RegisterUserDTO } from "types/users";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UsersResolver {
  readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Mutation(() => User)
  async register(@Arg("options") options: RegisterUserDTO): Promise<User> {
    return this.usersService.createUser(options);
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return this.usersService.getUserById(id);
  }
}
