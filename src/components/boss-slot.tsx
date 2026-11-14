import { useState } from "react";
import type { BossSchema } from "../boss-schema";

interface BossSlotProps {
  boss: BossSchema;
  game: string;
  storeFunction: CallableFunction;
}

const BossSlot: React.FC<BossSlotProps> = ({ boss, game, storeFunction }) => {
  const [isBeaten, setIsBeaten] = useState<boolean>(boss.beaten);

  let bossCodename: string = boss.name
    .toLowerCase()
    .replaceAll(" ", "-")
    .replace(/[()]/g, "");
  switch (boss.name) {
    case "Lace (Deep Docks)":
      bossCodename = bossCodename.replace("deep-docks", "1");
      break;
    case "Lace (The Cradle)":
      bossCodename = bossCodename.replace("the-cradle", "2");
      break;
    case "Savage Beastfly (Chapel of the Beast)":
      bossCodename = bossCodename.replace("chapel-of-the-beast", "1");
      break;
    case "Savage Beastfly (Far Fields)":
      bossCodename = bossCodename.replace("far-fields", "2");
      break;
    case "Watcher at the Edge":
      bossCodename = bossCodename.replace("-at-the-edge", "");
      break;
  }

  return (
    <div className="h-[360px] xl:h-[310px] w-full md:w-1/3 lg:w-1/4 xl:w-1/5 py-5 border-1 relative">
      <div className="h-[300px] xl:h-[250px] relative">
        <img
          src={`images/bosses/${game}/${bossCodename}.png`}
          className={`max-h-[300px] xl:max-h-[250px] absolute bottom-0 inset-x-0 mx-auto ${isBeaten && "opacity-50"}`}
        />
      </div>

      <h3
        className={`absolute bottom-0 text-center text-2xl w-full px-auto ${isBeaten && "text-white/50"}`}
      >
        {boss.name}
      </h3>
      <input
        type="checkbox"
        checked={isBeaten}
        className="bg-transparent accent-transparent absolute right-1 top-1 w-[20px] h-[20px]"
        onChange={(e) => {
          boss.beaten = e.target.checked;
          setIsBeaten(e.target.checked);
          storeFunction();
        }}
      />
    </div>
  );
};

export default BossSlot;
