import { Roles } from "entities/Roles";
import { RolesService } from "services/rolesService";
import { Query, Resolver } from "type-graphql";
import { Inject } from "typedi";

@Resolver()
export class RolesResolver {
  @Inject()
  rolesService: RolesService;

  // @Query(() => [Roles])
  // roles(): Promise<Roles[]> {
  //   return this.rolesService.getAll();
  // }
}
