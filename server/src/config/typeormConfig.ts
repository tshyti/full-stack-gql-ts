import { User } from "../entities/User";
import { createConnection } from "typeorm";

export async function configTypeOrm() {
  await createConnection({
    type: "mssql",
    host: process.env.DB_IP,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    logging: true,
    entities: [User]
  });
}
