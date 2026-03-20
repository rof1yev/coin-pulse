import CoinsPagination from "@/components/coins-pagination";
import DataTable from "@/components/data-table";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns: DataTableColumn<CoinMarketData>[] = [
  {
    header: "Rank",
    cellClassName: "rank-cell",
    cell: (coin: CoinMarketData) => (
      <>
        #{coin.market_cap_rank}
        <Link href={`/coins/${coin.id}`} aria-label="View coin" />
      </>
    ),
  },
  {
    header: "Token",
    cellClassName: "token-cell",
    cell: (coin: CoinMarketData) => (
      <div className="token-info">
        <Image
          src={coin.image}
          alt={coin.name}
          width={36}
          height={36}
          loading="lazy"
        />
        <p>
          {coin.name} ({coin.symbol.toUpperCase()})
        </p>
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-all",
    cell: (coin: CoinMarketData) => formatCurrency(coin.current_price),
  },
  {
    header: "24h Change",
    cellClassName: "change-cell",
    cell: (coin) => {
      const change = coin.price_change_percentage_24h;
      const isTrendingUp = change > 0;
      const isTrendingDown = change < 0;

      return (
        <div
          className={cn("price-change", {
            "text-green-500": isTrendingUp,
            "text-red-500": isTrendingDown,
          })}
        >
          <p className="flex items-center">
            {isTrendingUp && "+"}
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
    header: "Market Cap",
    cellClassName: "market-cap-cell",
    cell: (coin: CoinMarketData) => formatCurrency(coin.market_cap),
  },
];

export default async function CoinsPage({ searchParams }: NextPageProps) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const perPage = 10;

  const coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: perPage,
    page: currentPage,
    sparkline: "false",
    price_change_percentage: "24h",
  });

  const hasMorePages: boolean = coinsData.length === perPage;
  const estimatedTotalPages: number =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  return (
    <div id="coins-page">
      <div className="content">
        <h4>All Coins</h4>

        <DataTable
          columns={columns}
          data={coinsData.slice(0, 10) || []}
          rowKey={(coin) => coin.id}
          tableClassName="coins-table"
        />

        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasMorePages}
        />
      </div>
    </div>
  );
}
