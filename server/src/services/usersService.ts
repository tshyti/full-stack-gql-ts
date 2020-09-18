import argon2 from "argon2";
import { User } from "entities/User";
import { RegisterUserDTO } from "types/users";
import { getRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";

@Service()
export class UsersService {
  @InjectRepository(User)
  userRepo: Repository<User>;

  async createUser({ email, password }: RegisterUserDTO) {
    const hashedPassword = await argon2.hash(password);
    const userObj = await this.userRepo.create({
      email,
      password: hashedPassword
    });

    const insertedUser = await this.userRepo.save(userObj);

    return insertedUser;
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne(id);
    return user;
  }
}
