import { Nav } from "@/components/shared";
import React from "react";
interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="px-2 py-5 sm:px-10">{children}</div>
    </>
  );
};

export default AdminLayout;
