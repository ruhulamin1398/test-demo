"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Grid2 as Grid,
  Box,
  MenuItem,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  IRound,
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
} from "@/interfaces/round";
import { roundFormValidationSchema } from "@/utils/ypu-validation"; // Path to validation schema
import { OutlinedTextField } from "@/components/atoms/OutlinedTextField";
import CustomDatePicker from "@/components/atoms/CustomDatepicker";
import { formatDateForDatePicker } from "@/utils/date";
import JudgesSelector from "../atoms/JudgesSelector";
import useNotification from "@/app/hooks/useNotification";
import {
  CREATE_COMPETITION_ROUND,
  UPDATE_COMPETITION_ROUND,
} from "@/graphql-client/competition-round";
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
  setRoundInfo,
} from "@/store/slices/competitionSlice";
import { ICompetition, SubmissionTypeEnum } from "@/interfaces";

const RoundForm: React.FC = () => {
  const dispatch = useDispatch();
  const { competition } = useSelector((state: RootState) => state.competition);
  const { recordToModify, mode } = useSelector(
    (state: RootState) => state.competition.uiControls.roundInfoUi
  );
  const { notify } = useNotification();
  // GraphQL Mutation hooks
  const [createRound, { loading: createLoading, error: createError, data }] =
    useMutation(CREATE_COMPETITION_ROUND);
  const [
    updateRound,
    { loading: updateLoading, error: updateError, data: updatedData },
  ] = useMutation(UPDATE_COMPETITION_ROUND);

  const handleSubmit = async (values: unknown) => {
    const payloads = values as IRound;
    if (competition === null) {
      notify({
        severity: "error",
        message: "Need to create competition first.",
      });
      return;
    }
    const {
      maxScore = 0,
      maxVote = 0,
      maxWinners = 0,
      roundNumber = 1,
      judges = [],
      isActiveRound = false,
    } = payloads;
    const jids = judges.map((item) => item.id);
    if (mode === CompetitionUiModeEnum.CREATE) {
      await createRound({
        variables: {
          input: {
            ...payloads,
            maxScore: Number(maxScore || 0),
            maxVote: Number(maxVote || 0),
            maxWinners: Number(maxWinners),
            competition: competition.id,
            roundNumber: Number(roundNumber || 0),
            isActiveRound: isActiveRound,
            judges: jids,
          },
        },
      });
    } else {
      const { id, ...updatedPayload } = payloads;
      await updateRound({
        variables: {
          id: id, // Pass the id for update
          input: {
            ...updatedPayload,
            competition: competition.id,
            maxScore: Number(maxScore || 0),
            maxVote: Number(maxVote || 0),
            maxWinners: Number(maxWinners),
            roundNumber: Number(roundNumber || 0),
            isActiveRound: isActiveRound,
            judges: jids,
          },
        },
      });
    }
  };
  useEffect(() => {
    if (data?.createRound) {
      notify({
        severity: "success",
        message: "Successfully created round information.",
      });

      dispatch(setRoundInfo(data.createRound));
    }
    if (updatedData?.updateRound) {
      notify({
        severity: "success",
        message: "Successfully updated the round information.",
      });
      dispatch(setRoundInfo(updatedData.updateRound));
    }

    if (createError) {
      notify({ severity: "error", message: handleGraphQLError(createError) });
    }
    if (updateError) {
      notify({ severity: "error", message: handleGraphQLError(updateError) });
    }
  }, [data, updatedData, createError, updateError, notify]);

  const initialFormValues = {
    title: "",
    roundNumber: 1,
    startDate: formatDateForDatePicker(new Date()),
    endDate: formatDateForDatePicker(new Date()),
    submissionStartDate: formatDateForDatePicker(new Date()),
    submissionEndDate: formatDateForDatePicker(new Date()),
    judgementCriteria: RoundJudgementCriteriaEnum.JUDGE,
    maxScore: 100,
    maxVote: 100,
    maxWinners: 100,
    description: "",
    isActiveRound: false,
    status: RoundStatusEnum.UPCOMING,
    submissionType: SubmissionTypeEnum.PHOTO,
    judges: [] as string[],
  };

  const competitionRound = recordToModify
    ? {
        ...recordToModify,
        startDate: formatDateForDatePicker(recordToModify.startDate),
        endDate: formatDateForDatePicker(recordToModify.endDate),
        submissionStartDate: formatDateForDatePicker(
          recordToModify.submissionStartDate
        ),
        submissionEndDate: formatDateForDatePicker(
          recordToModify.submissionEndDate
        ),
        judges: recordToModify.judges.map(({ id, firstName, lastName }) => ({
          id,
          label: `${firstName} ${lastName}`,
        })),
        submissionType: recordToModify.submissionType || "Photo",
      }
    : initialFormValues;

  return (
    <Formik
      initialValues={competitionRound}
      validationSchema={roundFormValidationSchema({
        competitionStartDate: formatDateForDatePicker(
          (competition as ICompetition).startDate
        ),
        competitionEndDate: formatDateForDatePicker(
          (competition as ICompetition).endDate
        ),
      })}
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
                label="Round Number"
                name="roundNumber"
                component={OutlinedTextField}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                label="Judgement Criteria"
                name="judgementCriteria"
                component={OutlinedTextField}
                select
              >
                {Object.values(RoundJudgementCriteriaEnum).map((criteria) => (
                  <MenuItem key={criteria} value={criteria}>
                    {criteria}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                name="startDate"
                label="Start Date"
                component={CustomDatePicker}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                name="endDate"
                label="End Date"
                component={CustomDatePicker}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                name="submissionStartDate"
                label="Submission Start Date"
                component={CustomDatePicker}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                name="submissionEndDate"
                label="Submission End Date"
                component={CustomDatePicker}
              />
            </Grid>

            {(values.judgementCriteria === RoundJudgementCriteriaEnum.PUBLIC ||
              values.judgementCriteria === RoundJudgementCriteriaEnum.BOTH) && (
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Field
                  label={"Max  Vote"}
                  name="maxVote"
                  component={OutlinedTextField}
                />
              </Grid>
            )}

            {(values.judgementCriteria === RoundJudgementCriteriaEnum.JUDGE ||
              values.judgementCriteria === RoundJudgementCriteriaEnum.BOTH) && (
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Field
                  label={"Max  Score"}
                  name="maxScore"
                  component={OutlinedTextField}
                />
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                label="Status"
                name="status"
                component={OutlinedTextField}
                select
              >
                {Object.values(RoundStatusEnum).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Field
                label="Max winners for this round"
                name="maxWinners"
                component={OutlinedTextField}
              />
            </Grid>

            {/* Submission Type */}
            <Grid size={{ xs: 6, sm: 3 }}>
              <Field
                label="Submission Type"
                name="submissionType"
                component={OutlinedTextField}
                select
              >
                {Object.values(SubmissionTypeEnum).map((submissionType) => (
                  <MenuItem key={submissionType} value={submissionType}>
                    {submissionType}
                  </MenuItem>
                ))}
              </Field>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ py: 3 }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <Field name="isActiveRound" type="checkbox" sx={{ mx: 2 }} />
                Is Active Round
              </label>
            </Grid>

            {values.judgementCriteria === RoundJudgementCriteriaEnum.JUDGE ? (
              <Grid size={{ xs: 12 }}>
                <Field
                  name="judges"
                  label="Select Judges"
                  component={JudgesSelector}
                />
              </Grid>
            ) : null}
            <Grid size={{ xs: 12 }}>
              <Field
                rows={4}
                multiline
                label="Description"
                name="description"
                type="textarea"
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
              {!recordToModify ? "Create Round" : "Save Changes"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RoundForm;
