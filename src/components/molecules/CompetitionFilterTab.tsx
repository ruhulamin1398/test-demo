"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyntheticEvent, useState } from "react";
import { AppBar } from "@mui/material";

const CompetitionFilterTab = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <AppBar position="sticky" sx={{ top: "64px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Ongoing" />
        <Tab value="two" label="Upcomiing" />
        <Tab value="three" label="Completed" />
      </Tabs>
    </AppBar>
  );
};

export default CompetitionFilterTab;
