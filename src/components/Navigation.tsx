"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = ({ data }: { data: any }) => {
  const pathname = usePathname();

  const routes = data.map((item) => {
    return {
      label: item.name,
      href: `/category/${item.id}`,
      active: pathname === `/category/${item.id}`,
    };
  });

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((item) => {
        return (
          <Link
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black ",
              routes.active ? "text-black" : "text-neutral-500"
            )}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
