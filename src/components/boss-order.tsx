import type { BossSchema } from "../interfaces/boss-schema";
import BossSlot from "./boss-slot";

interface BossOrderProps {
  bossOrder: BossSchema[];
  game: string;
}

const BossOrder: React.FC<BossOrderProps> = ({ bossOrder, game }) => {
  return (
    <div className="w-9/10 flex flex-row flex-wrap">
      {bossOrder.map((boss) => (
        <BossSlot bossName={boss.name} game={game} />
      ))}
    </div>
  );
};

export default BossOrder;
