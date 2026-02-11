import { Navbar1 } from "@/components/layouts/navbar1";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar1></Navbar1>
      {children}
    </div>
  );
};

export default CommonLayout;
