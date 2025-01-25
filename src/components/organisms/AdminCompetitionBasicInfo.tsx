import * as React from "react";
import { RootState } from "@/app/store/store";
import { CancelOutlined, EditOutlined } from "@mui/icons-material";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompetitionForm from "./CompetitionForm";
import { ICompetition } from "@/interfaces";
import AdminCompetitionInfo from "./AdminCompetitionInfo";
import {
  CompetitionUiModeEnum,
  setUiControlsBasicInfo,
} from "@/app/store/slices/competitionSlice";

const AdminCompetitionBasicInfo: React.FC = () => {
  const { competition } = useSelector((state: RootState) => state.competition);
  const { mode } = useSelector(
    (state: RootState) => state.competition.uiControls.basicInfoUi
  );
  const dispatch = useDispatch();
  const handleOnEdit = () => {
    dispatch(
      setUiControlsBasicInfo({
        mode: CompetitionUiModeEnum.UPDATE,
        recordToModify: competition as ICompetition,
      })
    );
  };
  const handleOnCancelEdit = () => {
    dispatch(
      setUiControlsBasicInfo({
        mode: CompetitionUiModeEnum.VIEW,
        recordToModify: undefined,
      })
    );
  };

  const cardTitle = useMemo(() => {
    if (mode === CompetitionUiModeEnum.UPDATE) return "Update competition";
    return competition?.title;
  }, [mode, competition]);

  const isEditing = useMemo(
    () => mode === CompetitionUiModeEnum.UPDATE,
    [mode]
  );

  console.log("Nizam", CompetitionUiModeEnum, mode);
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
          {isEditing ? <CompetitionForm /> : <AdminCompetitionInfo />}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default AdminCompetitionBasicInfo;
