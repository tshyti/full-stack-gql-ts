import { Users } from "entities/Users";
import { RegisterUser } from "types/inputTypes/userInputTypes";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import argon2d from "argon2";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Roles } from "entities/Roles";
import GQLContext from "types/graphql/GQLContext";

@Resolver(() => Users)
export class UsersResolver {
  @InjectRepository(Users)
  userRepo: Repository<Users>;

  @Mutation(() => Users)
  async register(@Arg("options") options: RegisterUser): Promise<Users> {
    const hashedPassword = await argon2d.hash(options.password);
    const userObj = await this.userRepo.create({
      email: options.email,
      passsword: hashedPassword
    });

    const insertedUser = await this.userRepo.save(userObj);

    return insertedUser;
  }

  @Query(() => Users, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<Users | undefined> {
    const user = await this.userRepo.findOne(id, {
      relations: ["createdBy", "usersRoles", "usersRoles.role"]
    });

    return user;
  }

  @FieldResolver()
  roles(@Root() user: Users): Roles[] {
    return user.usersRoles?.map((usersRoles) => usersRoles.role);
  }

  @FieldResolver(() => Users, { nullable: true })
  async createdBy(@Root() user: Users, @Ctx() { loaders }: GQLContext) {
    try {
      return await loaders.usersLoader.load(user.createdById);
    } catch (error) {
      return null;
    }
  }
}
