import type { BossSchema } from "../boss-schema";
import { fetchBossList } from "./fetch";

let lanternAccessible: boolean = false;
let flagRemoved: boolean = true; //True to enable first iteration
let totalEssence: number = 0;

export const assembleBossOrder = (
  game: string,
  setOrderFunction: CallableFunction,
) => {
  fetchBossList(`data/bosses-${game}.json`, (bossList: BossSchema[]) => {
    let finalBossOrder: BossSchema[] =
      game == "ss"
        ? [
            {
              name: "Moss Mother",
              essence: 0,
              flags: [],
            },
          ]
        : [];

    // All available bosses are in a pool and will be randomly selected
    let bossPool: BossSchema[] = [];
    const bossCount = bossList.length;
    // Repeat until all bosses are in the final order
    while (finalBossOrder.length < bossCount) {
      // Add any newly available bosses if a progression flag was removed
      if (flagRemoved) {
        addUnflaggedBosses(bossList, bossPool);
        flagRemoved = false;
      }

      // Select a boss randomly, then remove it from the pool and add it to the order
      // Remove flags if applicable
      let selectedIndex = Math.floor(Math.random() * bossPool.length);
      if (selectedIndex == bossPool.length) selectedIndex--;
      const selectedBoss: BossSchema = bossPool[selectedIndex];
      finalBossOrder.push(selectedBoss);
      totalEssence += selectedBoss.essence;
      checkForRemovableFlag(bossList, selectedBoss);
      bossPool.splice(selectedIndex, 1);
    }

    if (game == "hk") {
      // Hollow Knight and Radiance are always fought last
      finalBossOrder = finalBossOrder.concat([
        {
          name: "Hollow Knight",
          essence: 0,
          flags: [],
        },
        {
          name: "Radiance",
          essence: 0,
          flags: [],
        },
      ]);
    } else if (game == "ss") {
    }

    flagRemoved = true;
    setOrderFunction(finalBossOrder);
  });
};

// Moves bosses with no flags from the list to the pool
const addUnflaggedBosses = (bossList: BossSchema[], bossPool: BossSchema[]) => {
  const addedIndices: number[] = [];

  for (let i = 0; i < bossList.length; i++) {
    if (bossList[i].flags.length > 0) continue;

    bossPool.push(bossList[i]);
    addedIndices.push(i);
  }

  let deletionCount: number = 0;
  for (let i of addedIndices) {
    bossList.splice(i - deletionCount, 1);
    deletionCount++;
  }
};

// Checks the selected boss and removes flags from the boss list if possible
const checkForRemovableFlag = (
  bossList: BossSchema[],
  selectedBoss: BossSchema,
) => {
  switch (selectedBoss.name) {
    case "Gruz Mother":
      lanternAccessible = true;
      removeFlag(bossList, "lumaflylantern");
      removeFlag(bossList, "crystalpeak");
      break;
    case "False Knight":
      removeFlag(bossList, "beatenfalseknight");
      break;
    case "Vengefly King":
      removeFlag(bossList, "beatenvengeflyking");
      break;
    case "Hornet Protector":
      removeFlag(bossList, "mothwingcloak");
      break;
    case "Soul Master":
      removeFlag(bossList, "crystalpeak");
      removeFlag(bossList, "desolatedive");
      removeFlag(bossList, "eastcity");
      break;
    case "Crystal Guardian":
      removeFlag(bossList, "beatencrystalguardian");
      break;
    case "Dung Defender":
      removeFlag(bossList, "ismatear");
      removeFlag(bossList, "eastcity");
      break;
    case "Troupe Master Grimm":
      removeFlag(bossList, "beatengrimm");
      break;
    case "Oblobbles":
      removeFlag(bossList, "beatenoblobbles");
      break;
    case "Broken Vessel":
      removeFlag(bossList, "monarchwings");
      break;
    case "Hornet Sentinel":
      removeFlag(bossList, "shadecloak");
      break;
  }

  if (lanternAccessible) removeFlag(bossList, "dreamnail");
  if (totalEssence >= 1800) removeFlag(bossList, "awokendreamnail");
};

// Removes the flag of the specified name from every boss in the list
const removeFlag = (bossList: BossSchema[], flagName: string) => {
  for (let boss of bossList) {
    // Find the flag name, then remove it
    let flagIndex = boss.flags.indexOf(flagName);
    if (flagIndex > -1) {
      boss.flags.splice(flagIndex, 1);
      flagRemoved = true;
    }
  }
};
