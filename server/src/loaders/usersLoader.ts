import DataLoader from "dataloader";
import { Users } from "entities/Users";
import { getRepository } from "typeorm";
import {arrayOfObjectsToObjectNumber} from "utils/arrayOfObjectsToObject";

async function batchUsers(ids: readonly number[]) {
  const usersInDb = await getRepository(Users).findByIds([...ids]);
  const usersMap = arrayOfObjectsToObjectNumber(usersInDb, "id");
  return ids.map((id) => usersMap[id] || new Error(`No result for ${id}`));
}

export default function usersLoader() {
  return new DataLoader<number, Users>(batchUsers);
}
