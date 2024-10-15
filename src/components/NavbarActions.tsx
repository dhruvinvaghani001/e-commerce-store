"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";


const NavbarActions = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="rounded-lg" variant={"secondary"}>
        <ShoppingBag />
        <span className="ml-2 text-lg">0</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
