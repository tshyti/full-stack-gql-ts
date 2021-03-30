import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Roles } from "./Roles";
import { UsersRoles } from "./UsersRoles";

@Index("fki_fk_created_by_users", ["createdById"], {})
@Index("Users_pkey", ["id"], { unique: true })
@Entity("Users", { schema: "public" })
@ObjectType()
export class Users {
  @Column("timestamp with time zone", {
    name: "CreatedOn",
    default: () => "CURRENT_TIMESTAMP"
  })
  @Field()
  createdOn: Date;

  @Column("text", { name: "Email" })
  @Field()
  email: string;

  @Column("text", { name: "Firstname", nullable: true })
  @Field(() => String, { nullable: true })
  firstname: string | null;

  @PrimaryGeneratedColumn({ type: "integer", name: "Id" })
  @Field(() => Int)
  id: number;

  @Column("text", { name: "Lastname", nullable: true })
  @Field(() => String, { nullable: true })
  lastname: string | null;

  @Column("text", { name: "Passsword" })
  passsword: string;

  @OneToMany(() => UsersRoles, (usersRoles) => usersRoles.user)
  usersRoles: UsersRoles[];

  @Field(() => [Roles])
  roles: Roles[];
}
