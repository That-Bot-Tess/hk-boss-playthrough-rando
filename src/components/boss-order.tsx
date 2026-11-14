import type { BossSchema } from "../boss-schema";
import BossSlot from "./boss-slot";

interface BossOrderProps {
  bossOrder: BossSchema[];
  game: string;
  storeFunction: CallableFunction;
}

const BossOrder: React.FC<BossOrderProps> = ({
  bossOrder,
  game,
  storeFunction,
}) => {
  return (
    <div className="w-9/10 flex flex-row flex-wrap">
      {bossOrder.map((boss) => (
        <BossSlot boss={boss} game={game} storeFunction={storeFunction} />
      ))}
    </div>
  );
};

export default BossOrder;
