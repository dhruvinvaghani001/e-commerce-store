import Link from "next/link";
import React from "react";
import Navigation from "./navigation";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./nav-bar-actions";

export const revalidate = 3600;

const Navbar = async () => {
  const data = await getCategories();

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto">
        <div className="relative px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href={"/"} className="ml-0 lg:ml-4 flex gap-x-2">
            <p className="text-bold text-xl"> STORE</p>
          </Link>
          <Navigation data={data} />
          <NavbarActions />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
