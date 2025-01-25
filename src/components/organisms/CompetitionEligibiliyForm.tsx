import React, { useEffect } from "react";
import MarkdownEditor from "./MarkdownEditor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import useNotification from "@/app/hooks/useNotification";
import { UPDATE_COMPETITION_ELIGIBILITY } from "@/graphql-client/competition";
import { useMutation } from "@apollo/client";
import { handleGraphQLError } from "@/utils/errorHandling";
import {
  CompetitionUiModeEnum,
  setUiControlsEligibility,
} from "@/app/store/slices/competitionSlice";
import { Backdrop, CircularProgress } from "@mui/material";

const CompetitionEligibiliyForm: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const { recordToModify } = useSelector(
    (state: RootState) => state.competition.uiControls.eligibility
  );
  const { notify } = useNotification();
  const [updateEligibility, { loading, error, data }] = useMutation(
    UPDATE_COMPETITION_ELIGIBILITY
  );
  const handleSubmit = async (values: unknown) => {
    await updateEligibility({
      variables: {
        id: id, // Pass the id for update
        eligibility: values as string,
      },
    });
  };
  useEffect(() => {
    if (data?.updateEligibility) {
      notify({
        severity: "success",
        message: "Successfully updated eligibility!.",
      });
      dispatch(
        setUiControlsEligibility({
          mode: CompetitionUiModeEnum.VIEW,
          recordToModify: undefined,
          eligibility: data?.updateEligibility.eligibility,
        })
      );
    }

    if (error) {
      notify({ severity: "error", message: handleGraphQLError(error) });
    }
  }, [data, loading, error, notify, dispatch]);

  return (
    <div>
      <MarkdownEditor
        initialValue={recordToModify || ""}
        onSave={handleSubmit}
      />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default CompetitionEligibiliyForm;
