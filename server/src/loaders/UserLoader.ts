import DataLoader from "dataloader";
import { Users } from "entities/Users";
import { getRepository } from "typeorm";
import transformArrayOfObjectsToObject from "utils/transformArrayOfObjectsToObject";

async function batchUser(ids: readonly number[]) {
  const usersInDb = await getRepository(Users).findByIds([...ids]);
  const usersMap = transformArrayOfObjectsToObject(usersInDb, "id");
  return ids.map((id) => usersMap[id] || new Error(`No result for ${id}`));
}

export default function userLoader() {
  return new DataLoader<number, Users>(batchUser);
}
