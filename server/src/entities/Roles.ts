import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { UsersRoles } from "./UsersRoles";

@Index("Roles_pkey", ["id"], { unique: true })
@Entity("Roles", { schema: "public" })
@ObjectType()
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  @Field(() => Int)
  id: number;

  @Column("text", { name: "Code" })
  code: string;

  @Column("text", { name: "Name" })
  name: string;

  @OneToMany(() => UsersRoles, (usersRoles) => usersRoles.role)
  usersRoles: UsersRoles[];
}
