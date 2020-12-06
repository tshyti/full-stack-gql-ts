import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUser {
  @Field()
  email: string;
  @Field()
  password: string;
}
