import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("users_roles_pk", ["roleCode", "userId"], { unique: true })
@Entity("UsersRoles", { schema: "public" })
@ObjectType()
export class UsersRoles {
  @Column("integer", { primary: true, name: "UserId" })
  @Field(() => Int)
  userId: number;

  @Column("text", { primary: true, name: "RoleCode" })
  roleCode: string;

  @Column("timestamp with time zone", {
    name: "CreatedOn",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdOn: Date;

  @ManyToOne(() => Roles, (roles) => roles.usersRoles)
  @JoinColumn([{ name: "RoleCode", referencedColumnName: "code" }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.usersRoles)
  @JoinColumn([{ name: "CreatedById", referencedColumnName: "id" }])
  createdBy: Users;

  @ManyToOne(() => Users, (users) => users.createdUsersRoles)
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
