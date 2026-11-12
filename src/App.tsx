import { useState } from "react";
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

  return (
    <div className="bg-[url(./images/menu-lifeblood.png)] bg-top min-h-screen flex flex-col items-center justify-start text-white font-serif">
      <img src={titleBanner} alt="title banner" className="w-4/5" />
      <h1 className="text-3xl mb-8">FULL SPOILERS AHEAD!</h1>
      <div>
        <button
          onClick={() => setGame("hk")}
          className="border-1 rounded-md px-4 py-2 mx-3"
        >
          <div className="flex flex-row items-center">
            <img src={hkIcon} className="h-[32px] mr-2" /> Hollow Knight
          </div>
        </button>
        <button
          onClick={() => setGame("ss")}
          className="border-1 rounded-md px-4 py-2 mx-3"
        >
          <div className="flex flex-row items-center">
            <img src={ssIcon} className="h-[32px] mr-2" /> Silksong
          </div>
        </button>
      </div>
      <button
        onClick={() => assembleBossOrder(game, setBossOrder)}
        className="border-1 rounded-md px-4 py-2 my-4 text-xl hover:bg-white/10 active:bg-white active:text-black "
      >
        Generate Random Boss Order
      </button>
      <BossOrder bossOrder={bossOrder} game={game} />
    </div>
  );
}

export default App;
