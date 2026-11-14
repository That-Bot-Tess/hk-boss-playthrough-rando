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
      <div className="my-5">
        <a
          href="https://github.com/That-Bot-Tess/hk-boss-playthrough-rando"
          className="flex flex-row items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[32px] h-[32px] "
          >
            {
              //!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.
            }
            <path
              fill="white"
              d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z"
            />
          </svg>
          <p className="text-lg mx-3">View Source Code on Github!</p>
        </a>
      </div>
    </div>
  );
}

export default App;
