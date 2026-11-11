import { useState } from "react";
import titleBanner from "./images/title-banner.png";
import "./App.css";
import BossOrder from "./components/boss-order";
import type { BossSchema } from "./boss-schema";

function App() {
  const [bossOrder, setBossOrder] = useState<BossSchema[]>([]);

  return (
    <div className="bg-blue-900 min-h-screen flex flex-col items-center justify-start text-white">
      <img src={titleBanner} alt="title banner" className="w-4/5" />
      <button
        onClick={() =>
          setBossOrder([
            {
              name: "False Knight",
              essence: 0,
              flags: [],
            },
          ])
        }
      >
        Generate Random Boss Order
      </button>
      <BossOrder bossOrder={bossOrder} />
    </div>
  );
}

export default App;
