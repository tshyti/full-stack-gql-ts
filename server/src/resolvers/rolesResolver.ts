import { Roles } from 'entities/Roles';
import { Users } from 'entities/Users';
import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import GQLContext from 'types/graphql/GQLContext';

@Resolver(() => Roles)
export class RolesResolver {
	rolesRepo: Repository<Roles>;

	constructor() {
		this.rolesRepo = getRepository(Roles);
	}

	@Query(() => [Roles])
	async roles(): Promise<Roles[]> {
		const roles = await this.rolesRepo.find({ relations: ['usersRoles'] });

		return roles;
	}

	@FieldResolver(() => [Users])
	users(@Root() role: Roles, @Ctx() { loaders }: GQLContext): Promise<Users[]> {
		const userIds = role.usersRoles.map((ur) => ur.userId);
		return loaders.usersLoader.loadMany(userIds) as Promise<Users[]>;
	}
}
