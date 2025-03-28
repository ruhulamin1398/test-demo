import { paths } from "@/routes/paths";

import { CONFIG } from "@/global-config";

import { Iconify } from "@/components/iconify";

import type { NavMainProps } from "./main/nav/types";

// ----------------------------------------------------------------------

export const navData: NavMainProps["data"] = [
  {
    title: "Home",
    path: "/",
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  {
    title: "Contests",
    path: paths.contest,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
];
