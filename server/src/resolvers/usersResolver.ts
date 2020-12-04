import { Users } from "entities/Users";
import { RegisterUserDTO } from "types/users";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Info,
  Root
} from "type-graphql";
import { Inject } from "typedi";
import argon2d from "argon2";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";
import { Repository } from "typeorm";
import { UsersRoles } from "entities/UsersRoles";
import { Roles } from "entities/Roles";
import { GraphQLResolveInfo } from "graphql";

@Resolver(() => Users)
export class UsersResolver {
  @InjectRepository(Users)
  userRepo: Repository<Users>;

  @Mutation(() => Users)
  async register(@Arg("options") options: RegisterUserDTO): Promise<Users> {
    const hashedPassword = await argon2d.hash(options.password);
    const userObj = await this.userRepo.create({
      email: options.email,
      passsword: hashedPassword
    });

    const insertedUser = await this.userRepo.save(userObj);

    return insertedUser;
  }

  @Query(() => Users, { nullable: true })
  async user(
    @Arg("id", () => Int) id: number,
    @Info() info: GraphQLResolveInfo
  ): Promise<Users | undefined> {
    const usera = await this.userRepo.findOne(id, {
      relations: ["createdBy", "usersRoles", "usersRoles.role"]
    });
    return usera;
  }

  @FieldResolver()
  roles(@Root() user: Users): Roles[] {
    return user.usersRoles?.map((usersRoles) => usersRoles.role);
  }
}
