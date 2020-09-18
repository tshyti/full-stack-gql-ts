import { Role } from "entities/Role";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";

@Service()
export class RolesService {
  @InjectRepository(Role)
  rolesRepo: Repository<Role>;

  async getAll(): Promise<Role[]> {
    const roles = await this.rolesRepo.find({ relations: ["users"] });

    return roles;
  }
}
