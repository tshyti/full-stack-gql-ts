import { Roles } from "entities/Roles";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";

@Service()
export class RolesService {
  @InjectRepository(Roles)
  rolesRepo: Repository<Roles>;

  async getAll(): Promise<Roles[]> {
    const roles = await this.rolesRepo.find({ relations: ["users"] });

    return roles;
  }
}
