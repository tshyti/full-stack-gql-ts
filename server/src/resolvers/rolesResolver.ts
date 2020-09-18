import { Role } from "entities/Role";
import { RolesService } from "services/rolesService";
import { Query, Resolver } from "type-graphql";
import { Inject } from "typedi";

@Resolver()
export class RolesResolver {
  @Inject()
  rolesService: RolesService;

  @Query(() => [Role])
  roles(): Promise<Role[]> {
    return this.rolesService.getAll();
  }
}
