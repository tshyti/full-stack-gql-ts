import argon2 from "argon2";
import { Users } from "entities/Users";
import { RegisterUserDTO } from "types/users";
import { getRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";

@Service()
export class UsersService {
  @InjectRepository(Users)
  userRepo: Repository<Users>;

  async createUser({ email, password }: RegisterUserDTO) {
    const hashedPassword = await argon2.hash(password);
    const userObj = await this.userRepo.create({
      email,
      passsword: hashedPassword
    });

    const insertedUser = await this.userRepo.save(userObj);

    return insertedUser;
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne(id, { relations: ["createdBy"] });
    return user;
  }
}
