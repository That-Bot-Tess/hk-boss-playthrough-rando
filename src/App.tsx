import { useEffect, useState } from "react";
import titleBanner from "./images/title-banner.png";
import hkIcon from "./images/icon-hk.png";
import ssIcon from "./images/icon-ss.png";
import "./App.css";
import BossOrder from "./components/boss-order";
import type { BossSchema } from "./boss-schema";
import { assembleBossOrder } from "./utils/order-assembler";

function App() {
  const [bossOrder, setBossOrder] = useState<BossSchema[]>([]);
  const [game, setGame] = useState<string>("hk");
  const [acidDashing, setAcidDashing] = useState<boolean>(false);
  const [fireballStalling, setFireballStalling] = useState<boolean>(false);
  const [wormwaysShortcut, setWormwaysShortcut] = useState<boolean>(false);

  const storeBossOrder = (order: BossSchema[] = bossOrder) => {
    localStorage.setItem("bossOrder", JSON.stringify(order));
    localStorage.setItem("game", game);
  };

  useEffect(() => {
    // Retrieve from local storage (for convenience)
    const storedBossOrder: string | null = localStorage.getItem("bossOrder");
    if (storedBossOrder) setBossOrder(JSON.parse(storedBossOrder));

    const storedGame: string | null = localStorage.getItem("game");
    if (storedGame) setGame(storedGame);
  }, []);

  return (
    <div className="bg-[url(./images/menu-lifeblood.png)] bg-top min-h-screen flex flex-col items-center justify-start text-white font-serif">
      <img src={titleBanner} alt="title banner" className="w-4/5" />
      <h1 className="text-3xl">FULL SPOILERS AHEAD!</h1>
      <div className="my-8">
        <button
          onClick={() => {
            setGame("hk");
            setBossOrder([]);
          }}
          className={`border-1 rounded-md px-4 py-2 mx-3 ${game == "hk" && "bg-white/10"} hover:bg-white/50 active:bg-white active:text-black`}
        >
          <div className="flex flex-row items-center">
            <img src={hkIcon} className="h-[32px] mr-2" /> Hollow Knight
          </div>
        </button>
        <button
          onClick={() => {
            setGame("ss");
            setBossOrder([]);
          }}
          className={`border-1 rounded-md px-4 py-2 mx-3 ${game == "ss" && "bg-white/10"} hover:bg-white/50 active:bg-white active:text-black`}
        >
          <div className="flex flex-row items-center">
            <img src={ssIcon} className="h-[32px] mr-2" /> Silksong
          </div>
        </button>
      </div>
      <div className="border rounded-lg p-5 w-9/10 lg:w-3/4">
        <h1 className="text-center text-lg mb-4">
          WHICH SKIPS CAN YOU PERFORM?
        </h1>
        <div className="w-3/4 md:w-1/2 mx-auto flex flex-row justify-evenly">
          {game == "ss" ? (
            <div>
              <input
                type="checkbox"
                id="wormways-shortcut"
                className="bg-transparent accent-transparent"
                onChange={(e) => setWormwaysShortcut(e.target.checked)}
                checked={wormwaysShortcut}
              />
              <label htmlFor="wormways-shortcut" className="px-3">
                Wormways Shortcut
              </label>
            </div>
          ) : (
            <>
              <div>
                <input
                  type="checkbox"
                  id="acid-dashing"
                  className="bg-transparent accent-transparent"
                  onChange={(e) => setAcidDashing(e.target.checked)}
                  checked={acidDashing}
                />
                <label htmlFor="wormways-shortcut" className="px-3">
                  Acid Skip
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="fireball-stalling"
                  className="bg-transparent accent-transparent"
                  onChange={(e) => setFireballStalling(e.target.checked)}
                  checked={fireballStalling}
                />
                <label htmlFor="fireball-stalling" className="px-3">
                  Fireball Skip
                </label>
              </div>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          assembleBossOrder(game, setBossOrder, storeBossOrder, {
            acidDashing,
            fireballStalling,
            wormwaysShortcut,
          });
        }}
        className="border-1 rounded-md px-4 py-2 my-4 text-xl hover:bg-white/10 active:bg-white active:text-black "
      >
        GENERATE RANDOM BOSS ORDER
      </button>
      <BossOrder
        bossOrder={bossOrder}
        game={game}
        storeFunction={storeBossOrder}
      />
    </div>
  );
}

export default App;
