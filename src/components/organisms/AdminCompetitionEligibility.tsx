"use client";
import * as React from "react";
import { RootState } from "@/store/store";
import { CancelOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CompetitionUiModeEnum,
  setUiControlsEligibility,
} from "@/store/slices/competitionSlice";
import CompetitionEligibiliyForm from "./CompetitionEligibiliyForm";

const AdminCompetitionEligibility: React.FC = () => {
  const { competition } = useSelector((state: RootState) => state.competition);
  const { mode } = useSelector(
    (state: RootState) => state.competition.uiControls.eligibility
  );
  const dispatch = useDispatch();
  const handleOnEdit = () => {
    dispatch(
      setUiControlsEligibility({
        mode: CompetitionUiModeEnum.UPDATE,
        recordToModify: competition?.eligibility,
      })
    );
  };
  const handleOnCancelEdit = () => {
    dispatch(
      setUiControlsEligibility({
        mode: CompetitionUiModeEnum.VIEW,
        recordToModify: undefined,
      })
    );
  };

  const cardTitle = useMemo(() => {
    if (mode === CompetitionUiModeEnum.UPDATE) return "Update Eligibility";
    return "Competition Eligibility";
  }, [mode, competition]);

  const isEditing = useMemo(
    () => mode === CompetitionUiModeEnum.UPDATE,
    [mode]
  );
  console.log("MODE", mode);

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title={cardTitle}
          action={
            <IconButton onClick={isEditing ? handleOnCancelEdit : handleOnEdit}>
              {isEditing ? <CancelOutlined /> : <EditOutlined />}
            </IconButton>
          }
        />
        <CardContent>
          {isEditing && competition?.id ? (
            <CompetitionEligibiliyForm id={competition.id!} />
          ) : (
            <Box
              sx={{
                "& ol": {
                  listStyleType: "decimal", // Default numbered list style
                  padding: 0, // Remove default padding
                  margin: 0, // Remove default margin
                },
                "& ol li": {
                  padding: "8px 0", // MUI-like list item padding
                  marginLeft: "24px", // Left margin for indentation
                  fontSize: "16px", // Default font size (adjust as needed)
                  lineHeight: 1.5, // Similar to MUI ListItem height
                  listStylePosition: "inside", // Align numbers inside the list item
                  display: "list-item", // Ensure it's displayed as a list item
                  "&:first-of-type": {
                    marginTop: 0, // Remove top margin for the first list item
                  },
                },
              }}
            >
              <ReactMarkdown>{competition?.eligibility}</ReactMarkdown>
            </Box>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default AdminCompetitionEligibility;
