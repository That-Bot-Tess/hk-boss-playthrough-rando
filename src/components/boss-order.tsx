import type { BossSchema } from "../boss-schema";

interface BossOrderProps {
  bossOrder: BossSchema[];
}

const BossOrder: React.FC<BossOrderProps> = ({ bossOrder }) => {
  return (
    <div>
      {bossOrder.map((boss) => {
        let bossCodename = boss.name.toLowerCase().replace(" ", "-");

        return (
          <div>
            <img src={`assets/bosses-hk/${bossCodename}.png`} />
            <h3>{boss.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default BossOrder;
