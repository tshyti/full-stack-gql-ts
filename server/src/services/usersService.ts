import argon2 from "argon2";
import { RegisterUserDTO } from "src/types/users";

export async function createUser(registerUserDto: RegisterUserDTO) {
  const hashedPassword = await argon2.hash(registerUserDto.password);
}
