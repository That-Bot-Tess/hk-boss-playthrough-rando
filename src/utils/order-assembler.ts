import type { BossSchema } from "../boss-schema";
import { fetchBossList } from "./fetch";

let lanternAccessible: boolean = false;
let flagRemoved: boolean = true; //True to enable first iteration
let totalEssence: number = 0;

interface SkipList {
  [key: string]: boolean;
}

export const assembleBossOrder = (
  game: string,
  setOrderFunction: CallableFunction,
  storeOrderFunction: CallableFunction,
  skips: SkipList,
) => {
  fetchBossList(`data/bosses-${game}.json`, (bossList: BossSchema[]) => {
    let finalBossOrder: BossSchema[] =
      game == "ss"
        ? [
            {
              name: "Moss Mother",
              flags: [],
              beaten: false,
            },
          ]
        : [];

    // Remove preemptive flags as necessary
    if (game == "ss") {
      if (skips.wormwaysShortcut) {
        removeFlag(bossList, "shellwood");
        removeFlag(bossList, "northernmarrow");
      } else removeFlag(bossList, "act2ifskipped");
    } else if (game == "hk") {
      if (skips.fireballStalling)
        removeFlag(bossList, "mothwingcloakorfireballstall");
      if (skips.acidDashing) removeFlag(bossList, "ismatear");
    }

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
      if (selectedBoss.essence) totalEssence += selectedBoss.essence;
      checkForRemovableFlag(bossList, selectedBoss);
      bossPool.splice(selectedIndex, 1);
    }

    // Add bosses always fought last
    if (game == "hk") {
      finalBossOrder = finalBossOrder.concat([
        {
          name: "Hollow Knight",
          essence: 0,
          flags: [],
          beaten: false,
        },
        {
          name: "Radiance",
          essence: 0,
          flags: [],
          beaten: false,
        },
      ]);
    } else if (game == "ss") {
      finalBossOrder.push({
        name: "Lost Lace",
        flags: [],
        beaten: false,
      });
    }

    flagRemoved = true;
    setOrderFunction(finalBossOrder);
    storeOrderFunction(finalBossOrder);
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
      removeFlag(bossList, "mothwingcloakorfireballstall");
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
      removeFlag(bossList, "beatendefender");
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
    case "Bell Beast":
      removeFlag(bossList, "northernmarrow");
      break;
    case "Lace (Deep Docks)":
      removeFlag(bossList, "driftercloak");
      break;
    case "Fourth Chorus":
      removeFlag(bossList, "beatenchorus");
      break;
    case "Savage Beastfly (Chapel of the Beast)":
      removeFlag(bossList, "beatenbeastfly");
      break;
    case "Moorwing":
      removeFlag(bossList, "shellwood");
      break;
    case "Sister Splinter":
      removeFlag(bossList, "clinggrip");
      break;
    case "Widow":
      removeFlag(bossList, "needolin");
      break;
    case "Great Conchflies":
      removeFlag(bossList, "sandsofkarak");
      break;
    case "Phantom":
    case "Last Judge":
      removeFlag(bossList, "act2");
      removeFlag(bossList, "act2ifskipped");
      break;
    case "Cogwork Dancers":
      removeFlag(bossList, "threefoldmelody");
      removeFlag(bossList, "threefoldorgroal");
      break;
    case "Groal the Great":
      removeFlag(bossList, "beatengroal");
      removeFlag(bossList, "threefoldorgroal");
      break;
    case "Signis & Gron":
      removeFlag(bossList, "silksoar");
      break;
    case "Raging Conchfly":
      removeFlag(bossList, "beatenconchfly");
      break;
    case "Shakra":
      removeFlag(bossList, "beatenshakra");
      break;
    case "Garmond & Zaza":
      removeFlag(bossList, "beatengarmond");
      break;
    case "Trobbio":
      removeFlag(bossList, "beatentrobbio");
      break;
    case "Lace (The Cradle)":
      removeFlag(bossList, "beatenlace");
      break;
    case "Grand Mother Silk":
      removeFlag(bossList, "act3");
      break;
    case "Palestag":
      removeFlag(bossList, "beatenpalestag");
      break;
    case "Shrine Guardian Seth":
      removeFlag(bossList, "beatenseth");
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
