import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Index("PK_Roles", ["id"], { unique: true })
@Entity("Roles", { schema: "dbo" })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  @Field(() => Int)
  id: number;

  @Column("nvarchar", { name: "Name", length: 50 })
  @Field()
  name: string;

  @Column("nvarchar", { name: "NormalizedName", length: 50 })
  @Field()
  normalizedName: string;

  @Column("datetime2", { name: "CreatedOn", default: () => "getdate()" })
  @Field()
  createdOn: Date;

  @OneToMany(() => User, (users) => users.role)
  @Field(() => [User])
  users: User[];
}
