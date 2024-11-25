import { Table, Award, User, Users } from "lucide-react";

import waveIcon from "@/assets/svg/wave.svg";
import sequelizeIcon from "@/assets/svg/sequelize.svg";
import chartIcon from "@/assets/svg/chart.svg";

export const navData = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Table,
  },
  {
    title: "My Profile",
    href: "/",
    icon: User,
    submenu: [
      { title: "Profile", href: "/profile" },
      { title: "Refer  Link", href: "/profile-refer" },
    ],
  },
  {
    title: "My Team",
    href: "/",
    icon: Users,
    submenu: [
      { title: "Structure", href: "/structure", icon: waveIcon },
      { title: "Generation", href: "/generation", icon: sequelizeIcon },
      { title: "Referral", href: "/referral", icon: chartIcon },
    ],
  },
  {
    title: "Lottery",
    href: "/",
    icon: User,
    submenu: [
      { title: "View Tickets", href: "/view-tickets" },
      { title: "Winners", href: "/winners" },
    ],
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Award,
  },
];
