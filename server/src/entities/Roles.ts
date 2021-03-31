import { Field, Int, ObjectType } from 'type-graphql';
import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { UsersRoles } from './UsersRoles';

@Index('Roles_pkey', ['id'], { unique: true })
@Entity('Roles', { schema: 'public' })
@ObjectType()
export class Roles {
	@PrimaryGeneratedColumn({ type: 'integer', name: 'Id' })
	@Field(() => Int)
	id: number;

	@Column('text', { name: 'Code' })
	@Field()
	code: string;

	@Column('text', { name: 'Name' })
	@Field()
	name: string;

	@OneToMany(() => UsersRoles, (usersRoles) => usersRoles.role)
	usersRoles: UsersRoles[];

	@Field(() => [Users])
	users: Users[];
}
