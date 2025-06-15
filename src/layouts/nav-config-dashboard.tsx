import type { NavSectionProps } from "@/components/nav-section";

import { paths } from "@/routes/paths";

import { CONFIG } from "@/global-config";

import { Label } from "@/components/label";
import { Iconify } from "@/components/iconify";
import { SvgColor } from "@/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon("ic-job"),
  blog: icon("ic-blog"),
  chat: icon("ic-chat"),
  mail: icon("ic-mail"),
  user: icon("ic-user"),
  file: icon("ic-file"),
  lock: icon("ic-lock"),
  tour: icon("ic-tour"),
  order: icon("ic-order"),
  label: icon("ic-label"),
  blank: icon("ic-blank"),
  kanban: icon("ic-kanban"),
  folder: icon("ic-folder"),
  course: icon("ic-course"),
  banking: icon("ic-banking"),
  booking: icon("ic-booking"),
  invoice: icon("ic-invoice"),
  product: icon("ic-product"),
  calendar: icon("ic-calendar"),
  disabled: icon("ic-disabled"),
  external: icon("ic-external"),
  menuItem: icon("ic-menu-item"),
  ecommerce: icon("ic-ecommerce"),
  analytics: icon("ic-analytics"),
  dashboard: icon("ic-dashboard"),
  parameter: icon("ic-parameter"),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps["data"] = [
  {
    subheader: "Management",
    items: [
      {
        title: "Category",
        path: paths.dashboard.category.root,
        icon: ICONS.label,
      },
      {
        title: "Competition",
        path: paths.dashboard.competition.root,
        icon: ICONS.booking,
      },
      {
        title: "User",
        path: paths.dashboard.user.root,
        icon: ICONS.user,
      },
    ],
  },
];
