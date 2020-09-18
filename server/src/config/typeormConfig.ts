import { Role } from "entities/Role";
import { User } from "entities/User";
import Container from "typedi";
import { createConnection, useContainer } from "typeorm";

export async function configTypeOrm() {
  useContainer(Container);

  await createConnection({
    type: "mssql",
    host: process.env.DB_IP,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    logging: true,
    entities: [User, Role]
  });
}
