import { createConnection } from 'typeorm';

export default async function configTypeOrm() {
	await createConnection({
		type: 'postgres',
		host: process.env.DB_IP,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		username: process.env.DB_USERNAME,
		logging: true,
		schema: 'public',
		entities: ['entities/**/*.ts', 'dist/entities/**/*.js'],
		migrationsTableName: 'TypeOrmMigrations',
		migrations: ['../migrations/*.js'],
		cli: {
			migrationsDir: 'migrations',
		},
	});
}
