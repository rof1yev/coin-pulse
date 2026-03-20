import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "../data-table";
import Image from "next/image";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

const columns: DataTableColumn<Category>[] = [
  {
    header: "Category",
    cellClassName: "category-cell",
    cell: (category: Category) => category.name,
  },
  {
    header: "Top Gainers",
    cellClassName: "top-gainers-cell",
    cell: (category: Category) =>
      category.top_3_coins.map((coin) => (
        <Image
          src={coin}
          alt={coin}
          key={coin}
          width={28}
          height={28}
          loading="lazy"
        />
      )),
  },
  {
    header: "24h Change",
    cellClassName: "change-header-cell",
    cell: (category: Category) => {
      const change = category.market_cap_change_24h;
      const isTrendingUp = change > 0;

      return (
        <div
          className={cn(
            "change-cell000 flex flex-col gap-1",
            isTrendingUp ? "text-green-500" : "text-red-500",
          )}
        >
          <p className="flex items-center">
            {isTrendingUp ? "+" : ""}
            {formatPercentage(category.market_cap_change_24h)}

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
    cell: (category: Category) => formatCurrency(category.market_cap),
  },
  {
    header: "24h Volume",
    cellClassName: "market-cell",
    cell: (category: Category) => formatCurrency(category.volume_24h),
  },
];

const Categories = async () => {
  const categories = await fetcher<Category[]>("/coins/categories");

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>

      <DataTable
        columns={columns}
        data={categories.slice(0, 10) || []}
        rowKey={(_, index: number) => index}
        tableClassName="mt-3"
      />
    </div>
  );
};

export default Categories;
