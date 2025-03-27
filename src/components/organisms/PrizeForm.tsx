"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid2 as Grid, Box, CircularProgress } from "@mui/material";
// Path to validation schema
import { OutlinedTextField } from "@/components/atoms/OutlinedTextField";
import useNotification from "@/app/hooks/useNotification";
import { useMutation } from "@apollo/client";
import { handleGraphQLError } from "@/utils/errorHandling";
import {
  CheckCircleOutline,
  PublishedWithChangesOutlined,
} from "@mui/icons-material";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  CompetitionUiModeEnum,
  setUiControlsPrizes,
} from "@/store/slices/competitionSlice";
import { IPrizesAndRewards } from "@/interfaces";
import {
  CREATE_COMPETITION_PRIZE,
  UPDATE_COMPETITION_PRIZE,
} from "@/graphql-client/competition-prize";
import { prizeFormValidationSchema } from "@/utils/ypu-validation";

const PrizeForm: React.FC = () => {
  const dispatch = useDispatch();
  const { competition } = useSelector((state: RootState) => state.competition);
  const { recordToModify, mode } = useSelector(
    (state: RootState) => state.competition.uiControls.prizesInfoUi
  );
  const { notify } = useNotification();
  // GraphQL Mutation hooks
  const [createPrize, { loading: createLoading, error: createError, data }] =
    useMutation(CREATE_COMPETITION_PRIZE);
  const [
    updatePrize,
    { loading: updateLoading, error: updateError, data: updatedData },
  ] = useMutation(UPDATE_COMPETITION_PRIZE);

  const handleSubmit = async (values: unknown) => {
    const payloads = values as IPrizesAndRewards;
    if (competition === null) {
      notify({
        severity: "error",
        message: "Need to create competition first.",
      });
      return;
    }
    const {
      position = 0,
      totalAwardws = 0,
      rewards = "",
      title = "",
    } = payloads;
    if (mode === CompetitionUiModeEnum.CREATE) {
      await createPrize({
        variables: {
          id: competition.id, // Pass the id for update
          input: {
            position: Number(position),
            totalAwardws: Number(totalAwardws),
            rewards,
            title,
          },
        },
      });
    } else {
      const { id, position, totalAwardws, rewards } = payloads;
      await updatePrize({
        variables: {
          id: competition.id, // Pass the id for update
          input: {
            position: Number(position),
            totalAwardws: Number(totalAwardws),
            rewards,
            title,
            id,
          },
        },
      });
    }
  };
  useEffect(() => {
    if (data?.createPrize) {
      notify({
        severity: "success",
        message: "Successfully created prize information.",
      });

      dispatch(setUiControlsPrizes(data.createPrize));
      dispatch(
        setUiControlsPrizes({
          mode: CompetitionUiModeEnum.VIEW,
          recordToModify: undefined,
          prizes: data.createPrize,
        })
      );
    }
    if (updatedData?.updatePrize) {
      notify({
        severity: "success",
        message: "Successfully updated the prize information.",
      });
      dispatch(
        setUiControlsPrizes({
          mode: CompetitionUiModeEnum.VIEW,
          recordToModify: undefined,
          prizes: updatedData.updatePrize,
        })
      );
    }

    if (createError) {
      notify({ severity: "error", message: handleGraphQLError(createError) });
    }
    if (updateError) {
      notify({ severity: "error", message: handleGraphQLError(updateError) });
    }
  }, [data, updatedData, createError, updateError, notify]);

  const initialFormValues = {
    position: 1,
    totalAwardws: 1,
    title: "",
    rewards: "",
  } as Omit<IPrizesAndRewards, "id">;

  const competitionPrize = recordToModify
    ? {
        ...recordToModify,
      }
    : initialFormValues;

  return (
    <Formik
      initialValues={competitionPrize}
      validationSchema={prizeFormValidationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
      enableReinitialize={true}
      validateOnMount
    >
      {({ values }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Field name="title" label="Title" component={OutlinedTextField} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                label="Position"
                name="position"
                component={OutlinedTextField}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                label="Total rewards"
                name="totalAwardws"
                component={OutlinedTextField}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                label="Rewards"
                name="rewards"
                component={OutlinedTextField}
              />
            </Grid>
          </Grid>

          <Box py={2} display={"flex"} justifyContent={"flex-end"}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createLoading || updateLoading}
              startIcon={
                createLoading || updateLoading ? (
                  <CircularProgress color="inherit" size={"1.5rem"} />
                ) : recordToModify ? (
                  <PublishedWithChangesOutlined color="inherit" />
                ) : (
                  <CheckCircleOutline color="inherit" />
                )
              }
            >
              {!recordToModify ? "Create Prize" : "Save Changes"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PrizeForm;
