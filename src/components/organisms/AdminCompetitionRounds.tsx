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
  setUiControlsRounds,
} from "@/store/slices/competitionSlice";
import CompetitionRounds from "./CompetitionRounds";
import { AddOutlined, CancelOutlined } from "@mui/icons-material";
import RoundForm from "./RoundForm";

const AdminCompetitionRounds: React.FC = () => {
  const { mode } = useSelector(
    (state: RootState) => state.competition.uiControls.roundInfoUi
  );

  const dispatch = useDispatch();

  const cardTitle = useMemo(() => {
    if (mode === CompetitionUiModeEnum.UPDATE)
      return "Update Round Information";
    else if (mode === CompetitionUiModeEnum.CREATE)
      return "Create Round Information";
    return "Round Informations";
  }, [mode]);

  const handleChangeMode = (m: CompetitionUiModeEnum) => {
    dispatch(
      setUiControlsRounds({
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
                  Create Round
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
            <RoundForm />
          ) : (
            <CompetitionRounds />
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default AdminCompetitionRounds;
