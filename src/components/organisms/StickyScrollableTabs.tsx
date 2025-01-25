"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { AppBar, Tabs, Tab, Box } from "@mui/material";
import { DateRangeTwoTone, EmojiEvents, Stairs } from "@mui/icons-material";
import TimeLine from "./TimeLine";
import DatesAndDeadline from "./DatesAndDeadline";
import RewardsAndPrizes from "./RewardsAndPrizes";

// Type for the Section data
interface SectionData {
  label: string;
  id: string;
  icon: ReactElement;
}

const sections: SectionData[] = [
  { label: "Stages & Timeline", id: "section-a", icon: <Stairs /> },
  // { label: "Details", id: "section-b", icon: <Details /> },
  { label: "Dates & Deadlines", id: "section-b", icon: <DateRangeTwoTone /> },
  { label: "Prizes", id: "section-c", icon: <EmojiEvents /> },
];
const StickyScrollableTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  // IntersectionObserver callback
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Find the section that is in view
        setVisibleSection(entry.target.id);
      }
    });
  };
  // Set up the IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when at least 50% of the section is visible
    });

    // Observe each section
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  // Update the selected tab based on the visible section
  useEffect(() => {
    if (visibleSection) {
      const index = sections.findIndex(
        (section) => section.id === visibleSection
      );
      setSelectedTab(index);
    }
  }, [visibleSection]);

  // Handle tab change (scroll to the related section)
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const sectionId = sections[newValue].id;
    setSelectedTab(newValue);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box py={2}>
      <AppBar
        position="sticky"
        color="primary"
        sx={(theme) => ({
          top: "64px",
          padding: 1,
          borderRadius: 3,
          marginBottom: 1,
        })}
        elevation={1}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="inherit"
          variant="scrollable"
          aria-label="scrollable tabs"
          scrollButtons={false}
        >
          {sections.map((section, index) => (
            <Tab
              iconPosition="start"
              icon={section.icon}
              key={index}
              label={section.label}
            />
          ))}
        </Tabs>
      </AppBar>
      <Box id={"section-a"} py={1}>
        <TimeLine />
      </Box>
      <Box id={"section-b"} py={1}>
        <DatesAndDeadline />
      </Box>
      <Box id={"section-c"} pt={1}>
        <RewardsAndPrizes />
      </Box>
    </Box>
  );
};

export default StickyScrollableTabs;
