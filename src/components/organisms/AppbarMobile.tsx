import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Link,
  Button,
} from "@mui/material";
import {
  Home,
  Search,
  MoreVert,
  HomeOutlined,
  EmojiEventsOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";

// Defining types for the component props and state
const BottomAppBarWithJustifiedMenus: React.FC = () => {
  // State for the selected navigation value (index) and menu anchor
  const [value, setValue] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open menu handler
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu handler
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // Menu item click handler
  const handleMenuItemClick = (index: number): void => {
    console.log(`Menu Item ${index} clicked`);
    handleClose();
  };

  return (
    <div>
      {/* AppBar with Bottom Navigation */}
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeOutlined />} />
            <BottomNavigationAction
              label="Competition"
              icon={<EmojiEventsOutlined />}
            />
            <BottomNavigationAction
              label="Account"
              icon={<PeopleAltOutlined />}
            />
          </BottomNavigation>
        </Toolbar>
      </AppBar>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(1)}>Menu Item 1</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(2)}>Menu Item 2</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(3)}>Menu Item 3</MenuItem>
      </Menu>
    </div>
  );
};

export default BottomAppBarWithJustifiedMenus;
