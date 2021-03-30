import { Roles } from "entities/Roles";
import { Users } from "entities/Users";
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import GQLContext from "types/graphql/GQLContext";

@Resolver(() => Roles)
export class RolesResolver {
  @InjectRepository(Roles)
  rolesRepo: Repository<Roles>;

  @Query(() => [Roles])
  async roles(): Promise<Roles[]> {
    const roles = await this.rolesRepo.find({ relations: ["usersRoles"] });

    return roles;
  }

  @FieldResolver(() => [Users])
  users(@Root() role: Roles, @Ctx() { loaders }: GQLContext): Promise<Users[]> {
    const userIds = role.usersRoles.map((ur) => ur.userId);
    return loaders.usersLoader.loadMany(userIds) as Promise<Users[]>;
  }
}
