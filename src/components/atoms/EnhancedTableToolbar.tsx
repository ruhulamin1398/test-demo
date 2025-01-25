import { Toolbar } from "@mui/material";
import { ReactElement } from "react";

interface EnhancedTableToolbarProps {
  children: ReactElement;
}
export const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (
  props
) => {
  const { children } = props;
  return (
    <Toolbar
      sx={[
        {
          p: { sm: 2, xs: 2 },
        },
      ]}
    >
      {children}
    </Toolbar>
  );
};
