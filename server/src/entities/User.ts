import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  DefaultNamingStrategy,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Role } from "./Role";

@Index("PK_Users", ["id"], { unique: true })
@Entity("Users", { schema: "dbo" })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  @Field(() => Int)
  id: number;

  @Column("nvarchar", { name: "Email", length: 100 })
  @Field()
  email: string;

  @Column("nvarchar", { name: "Password" })
  password: string;

  @Column("nvarchar", { name: "Name", nullable: true, length: 50 })
  @Field(() => String, { nullable: true })
  name: string | null;

  @Column("nvarchar", { name: "Surname", nullable: true, length: 50 })
  @Field(() => String, { nullable: true })
  surname: string | null;

  @Column("datetime2", { name: "Birthdate", nullable: true })
  @Field(() => Date, { nullable: true })
  birthdate: Date | null;

  @Column("datetime2", { name: "CreatedOn", default: () => "getdate()" })
  @Field()
  createdOn: Date;

  @Column("datetime2", { name: "UpdatedOn", default: () => "getdate()" })
  @Field()
  updatedOn: Date;

  @ManyToOne(() => Role, (roles) => roles.users)
  @JoinColumn([{ name: "RoleId", referencedColumnName: "id" }])
  @Field()
  role: Role;
}
