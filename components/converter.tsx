"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Converter = ({ symbol, icon, priceList }: ConverterProps) => {
  const [currency, setCurrency] = useState("usd");
  const [amount, setAmount] = useState("10");

  const convertedPrice = (parseFloat(amount) || 0) * (priceList[currency] || 0);

  return (
    <div id="converter">
      <h4>{symbol.toUpperCase()}</h4>

      <div className="panel">
        <div className="input-wrapper">
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            className="input"
          />
          <div className={cn("pl-2! coin-info")}>
            <Image
              src={icon}
              alt={symbol}
              width={20}
              height={20}
              loading="lazy"
            />
            <p>{symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="divider">
          <div className="line" />
          <Image
            src="/assets/converter.svg"
            alt="Converter svg"
            width={32}
            height={32}
            className="icon"
          />
        </div>

        <div className="output-wrapper">
          <p>{formatCurrency(convertedPrice, 2, currency, false)}</p>

          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="select-trigger" value={currency}>
              <SelectValue placeholder="Select" className="select-value">
                {currency.toUpperCase()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="select-content" data-converter>
              <SelectGroup>
                {Object.keys(priceList).map((currencyCode) => (
                  <SelectItem
                    className="select-item"
                    value={currencyCode}
                    key={currencyCode}
                  >
                    {currencyCode.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Converter;
