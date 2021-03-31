declare namespace NodeJS {
	export interface ProcessEnv {
		DB_IP: string;
		DB_PASSWORD: string;
		DB_USERNAME: string;
		DB_NAME: string;
		SERVER_PORT: string;
	}
}
