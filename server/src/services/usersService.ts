import argon2 from "argon2";
import { User } from "../entities/User";
import { RegisterUserDTO } from "../types/users";
import { getRepository, Repository } from "typeorm";

export class UsersService {
  userRepo: Repository<User>;

  constructor() {
    this.userRepo = getRepository(User);
  }

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
