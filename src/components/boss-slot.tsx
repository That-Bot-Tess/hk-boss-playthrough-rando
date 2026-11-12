interface BossSlotProps {
  bossName: string;
  game: string;
}

const BossSlot: React.FC<BossSlotProps> = ({ bossName, game }) => {
  let bossCodename = bossName.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="h-[360px] xl:h-[310px] w-full md:w-1/3 lg:w-1/4 xl:w-1/6 py-5 border-1">
      <div className="h-[300px] xl:h-[250px] relative">
        <img
          src={`images/bosses/${game}/${bossCodename}.png`}
          className="max-h-[300px] xl:max-h-[250px] absolute bottom-0 inset-x-0 mx-auto"
        />
      </div>

      <h3 className="text-center text-2xl w-full px-auto">{bossName}</h3>
    </div>
  );
};

export default BossSlot;
