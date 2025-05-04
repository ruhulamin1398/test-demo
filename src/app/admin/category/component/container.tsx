"use client";
import { Iconify } from "@/components/iconify";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { ActionTypes } from "./categoryTableRow";

type Props = {
  children: React.ReactNode;
  onCreateCategory: (category: undefined, action: ActionTypes) => void;
};

const PageContainer = ({ children, onCreateCategory }: Props) => {
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Categories
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => onCreateCategory(undefined, "create")}
            >
              New Category
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </Box>
  );
};

export default PageContainer;
