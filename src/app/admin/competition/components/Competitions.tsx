import * as React from "react";
import { RootState } from "@/store/store";
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
} from "@/store/slices/competitionSlice";
import { AddOutlined, CancelOutlined } from "@mui/icons-material";
import { CompetitionList } from "@/app/competition/components/CompetitionList";
import CompetitionForm from "./forms/CompetitionForm";

const Competitions: React.FC = () => {
  const { mode } = useSelector((state: RootState) => {
    console.log(state.competition);
    return state.competition.uiControls.basicInfoUi;
  });

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
                  Create Competition
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
            <CompetitionList competitions={[]} />
          ) : (
            <CompetitionForm />
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Competitions;
