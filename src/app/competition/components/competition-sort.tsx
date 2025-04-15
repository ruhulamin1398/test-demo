import { usePopover } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

import { Iconify } from "src/components/iconify";
import { CustomPopover } from "src/components/custom-popover";
import { CompetitionStatusEnum } from "@/interfaces";

// ----------------------------------------------------------------------

type Props = {
  sort: string;
  onSort: (newValue: string) => void;
};

export function CompetitionSort({ sort, onSort }: Props) {
  const menuActions = usePopover();

  const sortLabel = Object.values(CompetitionStatusEnum).find(
    (status) => status === sort
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
    >
      <MenuList>
        {Object.values(CompetitionStatusEnum).map((status) => (
          <MenuItem
            key={status}
            value={status}
            selected={status === sort}
            onClick={() => {
              menuActions.onClose();
              onSort(status);
            }}
          >
            {status}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={menuActions.onOpen}
        endIcon={
          <Iconify
            icon={
              menuActions.open
                ? "eva:arrow-ios-upward-fill"
                : "eva:arrow-ios-downward-fill"
            }
          />
        }
        sx={{ fontWeight: "fontWeightSemiBold" }}
      >
        Sort by:
        <Box component="span" sx={{ ml: 0.5, fontWeight: "fontWeightBold" }}>
          {sortLabel}
        </Box>
      </Button>

      {renderMenuActions()}
    </>
  );
}
