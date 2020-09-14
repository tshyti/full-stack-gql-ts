import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUserDTO {
  @Field()
  email: string;
  @Field()
  password: string;
}
