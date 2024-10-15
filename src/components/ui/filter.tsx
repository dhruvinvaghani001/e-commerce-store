"use client";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface FilterProps {
  name: string;
  valueKey: string;
  data: (Size | Color)[];
}
const Filter = ({ name, valueKey, data }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedvalue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = queryString.parse(searchParams.toString());
    const query = {
      ...current,
      [valueKey]: id,
    };
    if (current[valueKey] == id) {
      query[valueKey] = null;
    }

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8 ">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <Button
                className={cn(
                  "rouned-md text-sm text-gray-800 bg-white border border-gray-300 hover:bg-gray-100",
                  selectedvalue == item.id && "border-2 border-black"
                )}
                onClick={() => onClick(item.id)}
              >
                {name == "Colors" ? null : item.name}
                {name == "Colors" && (
                  <div
                    className="w-6 h-6 rounded-full border border-gray-700"
                    style={{ backgroundColor: item.value }}
                  />
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
