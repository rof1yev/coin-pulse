import DataTable from "@/components/data-table";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TrendingCoinsFallback } from "./fallback";

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
            className="rounded-full mb-1"
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
            "price-change",
            isTrendingUp ? "text-green-500" : "text-red-500",
          )}
        >
          <p className="flex items-center">
            {change > 0 ? "+" : ""}
            {formatPercentage(change)}
            {isTrendingUp ? (
              <TrendingUp height={16} width={16} />
            ) : (
              <TrendingDown height={16} width={16} />
            )}
          </p>
        </div>
      );
    },
  },
  {
    header: "Price",
    cellClassName: "name-cell",
    cell: (coin) => formatCurrency(coin.item.data.price),
  },
];

const TrendingCoins = async () => {
  let trendingCoins;

  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      "/search/trending",
      undefined,
      300,
    );
  } catch (error) {
    console.log("Error fetching trending coins:", error);
    return <TrendingCoinsFallback />;
  }

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>

      <DataTable
        data={trendingCoins.coins.slice(0, 6) || []}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoins;
