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
  Info,
  Root
} from "type-graphql";
import { Inject } from "typedi";
import argon2d from "argon2";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";
import { Repository } from "typeorm";
import { Roles } from "entities/Roles";

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
  roles(@Root() _: Users): Roles[] {
    return [];
  }
}
