import * as React from "react";
import { RootState } from "@/app/store/store";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CompetitionUiModeEnum,
  setUiControlsBasicInfo,
} from "@/app/store/slices/competitionSlice";
import { AddOutlined, CancelOutlined } from "@mui/icons-material";
import CompetitionForm from "../CompetitionForm";

const Competitions: React.FC = () => {
  const { mode } = useSelector(
    (state: RootState) => state.competition.uiControls.prizesInfoUi
  );

  const dispatch = useDispatch();

  const cardTitle = useMemo(() => {
    if (mode === CompetitionUiModeEnum.UPDATE)
      return "Update Prizes Information";
    else if (mode === CompetitionUiModeEnum.CREATE)
      return "Create Prizes Information";
    return "Prizes Informations";
  }, [mode]);

  const handleChangeMode = (m: CompetitionUiModeEnum) => {
    console.log("Clicked", m);
    dispatch(
      setUiControlsBasicInfo({
        mode: m,
        recordToModify: undefined,
      })
    );
  };

  return (
    <React.Fragment>
      <Card elevation={0}>
        <CardHeader
          title={cardTitle}
          action={
            <>
              {mode === CompetitionUiModeEnum.VIEW ? (
                <Button
                  color="primary"
                  startIcon={<AddOutlined />}
                  onClick={() => handleChangeMode(CompetitionUiModeEnum.CREATE)}
                  variant="contained"
                  disableElevation
                >
                  Competitions
                </Button>
              ) : (
                <IconButton
                  onClick={() => handleChangeMode(CompetitionUiModeEnum.VIEW)}
                >
                  <CancelOutlined />
                </IconButton>
              )}
            </>
          }
        />
        <CardContent>
          {mode !== CompetitionUiModeEnum.VIEW ? (
            <CompetitionForm />
          ) : (
            <CompetitionForm />
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Competitions;
