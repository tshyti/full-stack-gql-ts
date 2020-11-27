import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("user_roles_pk", ["roleId", "userId"], { unique: true })
@Entity("UserRoles", { schema: "public" })
@ObjectType()
export class UserRoles {
  @Column("integer", { primary: true, name: "UserId" })
  @Field(() => Int)
  userId: number;

  @Column("integer", { primary: true, name: "RoleId" })
  @Field(() => Int)
  roleId: number;

  @Column("timestamp with time zone", {
    name: "CreatedOn",
    default: () => "CURRENT_TIMESTAMP"
  })
  @Field()
  createdOn: Date;

  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn([{ name: "RoleId", referencedColumnName: "id" }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.userRoles)
  @JoinColumn([{ name: "CreatedBy", referencedColumnName: "id" }])
  @Field(() => Users)
  createdBy: Users;

  @ManyToOne(() => Users, (users) => users.createdUserRoles)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  @Field(() => Users)
  user: Users;
}
