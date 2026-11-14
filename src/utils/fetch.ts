import type { BossSchema } from "../interfaces/boss-schema";

export const fetchBossList = async (
  url: string,
  callback: Function,
): Promise<void> => {
  const bossList: BossSchema[] = await fetch(url).then((response) =>
    response.json(),
  );
  return callback(bossList);
};
