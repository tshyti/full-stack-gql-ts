import { Roles } from "entities/Roles";
import { Query, Resolver } from "type-graphql";
import { Inject } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";

@Resolver()
export class RolesResolver {
  @InjectRepository(Roles)
  rolesRepo: Repository<Roles>;

  @Query(() => [Roles])
  async roles(): Promise<Roles[]> {
    const roles = await this.rolesRepo.find();

    return roles;
  }
}
