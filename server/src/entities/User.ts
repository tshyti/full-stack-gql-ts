import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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
  @Field(() => String)
  name: string | null;

  @Column("nvarchar", { name: "Surname", nullable: true, length: 50 })
  @Field(() => String)
  surname: string | null;
}
