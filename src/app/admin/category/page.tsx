import React from "react";
import MainContent from "./component/main";
import { DashboardContent } from "@/layouts/dashboard";

type Props = {};

const CategoryPage = (props: Props) => {
  return (
    <DashboardContent>
      <MainContent />
    </DashboardContent>
  );
};

export default CategoryPage;
