import DataTable from "@/components/data-table";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link href={`/coins/${item.id}`}>
          <Image
            src={item.large}
            alt={item.name}
            width={26}
            height={26}
            loading="lazy"
          />
          <p>{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: "24h Change",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;
      const change = item.data.price_change_percentage_24h.usd;
      const isTrendingUp = change > 0;

      return (
        <div
          className={cn(
            "price-change flex flex-col gap-1",
            isTrendingUp ? "text-green-500" : "text-red-500",
          )}
        >
          {isTrendingUp ? (
            <TrendingUp height={16} width={16} />
          ) : (
            <TrendingDown height={16} width={16} />
          )}

          <p>
            {change > 0 ? "+" : ""}
            {change.toFixed(2)}%
          </p>
        </div>
      );
    },
  },
  {
    header: "Price",
    cellClassName: "name-cell",
    cell: (coin) => `$${coin.item.data.price.toLocaleString()}`,
  },
];

const dummyTreadingCoins: TrendingCoin[] = [
  {
    item: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      market_cap_rank: 1,
      thumb: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      data: {
        price: 83133.0,
        price_change_percentage_24h: {
          usd: 2.5,
        },
      },
    },
  },
  {
    item: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      market_cap_rank: 2,
      thumb: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      data: {
        price: 4021.5,
        price_change_percentage_24h: {
          usd: -1.2,
        },
      },
    },
  },
  {
    item: {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      market_cap_rank: 3,
      thumb: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
      large: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
      data: {
        price: 1.0,
        price_change_percentage_24h: {
          usd: 0.01,
        },
      },
    },
  },
  {
    item: {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      market_cap_rank: 4,
      thumb: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      large: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      data: {
        price: 210.75,
        price_change_percentage_24h: {
          usd: 5.8,
        },
      },
    },
  },
  {
    item: {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      market_cap_rank: 5,
      thumb: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      large: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      data: {
        price: 0.85,
        price_change_percentage_24h: {
          usd: -0.9,
        },
      },
    },
  },
];

export default function HomePage() {
  return (
    <main className="main-container">
      <section className="home-grid">
        <div id="coin-overview">
          <div className="header pt-2">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              alt="Bitcoin"
              width={56}
              height={56}
            />
            <div className="info">
              <p>Bitcoin / BTC</p>
              <h1>$89,133.00</h1>
            </div>
          </div>
        </div>

        <p>Trending Coins</p>
        <div className="trending-coins">
          <DataTable
            data={dummyTreadingCoins}
            columns={columns}
            rowKey={(coin) => coin.item.id}
            tableClassName="trending-coins-table"
          />
        </div>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}
