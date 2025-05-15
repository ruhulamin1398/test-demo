"use client";
import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import {
  Button,
  Grid2 as Grid,
  MenuItem,
  CircularProgress,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
} from "@/interfaces/round";
import { SubmissionTypeEnum } from "@/interfaces";

import { IRound } from "@/interfaces/round";
import { formatDateForDatePicker } from "@/utils/date";
import { LocalizationProvider } from "@/locales";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getRoundFormZodSchema } from "@/utils/ypu-validation";
import dayjs, { Dayjs } from "dayjs";
import { CompetitionUiModeEnum } from "@/store/slices/competitionSlice";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import {
  CREATE_COMPETITION_ROUND,
  UPDATE_COMPETITION_ROUND,
} from "@/graphql-client/competition-round";
import { GET_COMPETITION_QUERY } from "@/graphql-client/competition";
import { DateRangePickerController } from "@/components/date-range-picker";
import { Field, Form } from "@/components/hook-form";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { JudgeAutocomplete } from "@/components/atoms/JudgesAutocomplete";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// ... Apollo and Redux imports omitted for brevity

const roundSchema = getRoundFormZodSchema({
  competitionStartDate: dayjs(),
  competitionEndDate: dayjs().add(7, "days"),
  hasRoundWiseSubmission: false,
});

type RoundFormInputs = z.infer<typeof roundSchema>;

export const RoundForm: React.FC = () => {
  const dispatch = useDispatch();
  const { competition } = useSelector((state: RootState) => state.competition);
  const { recordToModify, mode } = useSelector(
    (state: RootState) => state.competition.uiControls.roundInfoUi
  );
  // GraphQL Mutation hooks
  const [createRound, { loading: createLoading, error: createError, data }] =
    useMutation(CREATE_COMPETITION_ROUND, {
      refetchQueries: [
        {
          query: GET_COMPETITION_QUERY,
          variables: { id: competition?.id },
        },
      ],
      awaitRefetchQueries: true, // ensures query finishes before continuing
    });
  const [
    updateRound,
    { loading: updateLoading, error: updateError, data: updatedData },
  ] = useMutation(UPDATE_COMPETITION_ROUND, {
    refetchQueries: [
      {
        query: GET_COMPETITION_QUERY,
        variables: { id: competition?.id },
      },
    ],
    awaitRefetchQueries: true, // ensures query finishes before continuing
  });

  const methods = useForm<RoundFormInputs>({
    resolver: zodResolver(
      getRoundFormZodSchema({
        competitionStartDate: dayjs(Number(competition?.startDate)),
        competitionEndDate: dayjs(Number(competition?.endDate)),
        hasRoundWiseSubmission: competition?.haveRoundWiseSubmission || false,
      })
    ),
    defaultValues: {
      title: "",
      roundNumber: 1,
      deadline: [null, null],
      submissionDeadline: [null, null],
      votingDeadline: [null, null],
      judgingDeadline: [null, null],
      judgementCriteria: RoundJudgementCriteriaEnum.JUDGE,
      maxScore: 0,
      maxVote: 0,
      maxWinners: 100,
      description: "",
      isActiveRound: false,
      status: RoundStatusEnum.UPCOMING,
      submissionType: SubmissionTypeEnum.PHOTO,
      judges: [],
    },
    mode: "onSubmit",
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting, errors },
    trigger,
  } = methods;
  const [deadline, submissionDeadline, selectedCriteria] = watch([
    "deadline",
    "submissionDeadline",
    "judgementCriteria",
  ]);
  const onSubmit: SubmitHandler<RoundFormInputs> = async (values) => {
    const {
      maxScore,
      maxVote,
      maxWinners,
      roundNumber,
      judges,
      isActiveRound,
    } = values;

    const inputPayload = {
      ...values,
      maxScore: Number(maxScore),
      maxVote: Number(maxVote),
      maxWinners: Number(maxWinners),
      roundNumber: Number(roundNumber),
      judges: judges,
      isActiveRound: isActiveRound,
    };

    console.log("Form values", values);
    return;
    if (mode === CompetitionUiModeEnum.CREATE) {
      await createRound({ variables: { input: inputPayload } });
    } else {
      if (!competition) {
        toast.error("Need to create competition first.");
        return;
      }
      const { id = null, ...updateData } = { id: null, ...values };
      await updateRound({
        variables: {
          id: competition.id,
          input: { ...updateData, competition: competition.id },
        },
      });
    }
  };

  useEffect(() => {
    if (recordToModify) {
      const modified = {
        ...recordToModify,
        startDate: dayjs(Number(recordToModify.startDate)),
        endDate: dayjs(Number(recordToModify.endDate)),
        submissionStartDate: dayjs(Number(recordToModify.submissionStartDate)),
        submissionEndDate: dayjs(Number(recordToModify.submissionEndDate)),
        judges: recordToModify.judges.map(({ id, name, profilePicture }) => ({
          id,
          label: name,
          profilePicture,
        })),
        isActiveRound: !!recordToModify.isActiveRound,
      };
      reset(modified);
    }
  }, [recordToModify, reset]);

  useEffect(() => {
    trigger(["submissionDeadline"]);
  }, [deadline, submissionDeadline]);

  return (
    <LocalizationProvider>
      <Form methods={{ ...methods }} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Name</Typography>
          <Field.Text name="title" placeholder="Ex: Eliminary round..." />
        </Stack>

        <Box py={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 4 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Round Number</Typography>
                <Field.Text name="roundNumber" placeholder="Ex: 1,2,3..." />
              </Stack>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Judgement Criteria</Typography>
                <Field.Select
                  name="judgementCriteria"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                >
                  {Object.values(RoundJudgementCriteriaEnum).map((criteria) => (
                    <MenuItem key={criteria} value={criteria}>
                      {criteria}
                    </MenuItem>
                  ))}
                </Field.Select>
              </Stack>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Deadline</Typography>
                <DateRangePickerController
                  name="deadline"
                  control={control}
                  minDate={dayjs(Number(competition?.startDate))}
                  maxDate={dayjs(Number(competition?.endDate))}
                />
              </Stack>
            </Grid>
            {competition?.haveRoundWiseSubmission ? (
              <Grid size={{ xs: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">
                    Submission Deadline
                  </Typography>
                  <DateRangePickerController
                    name="submissionDeadline"
                    control={control}
                    minDate={
                      deadline?.[0] || dayjs(Number(competition?.startDate))
                    }
                    maxDate={
                      deadline?.[1] || dayjs(Number(competition?.endDate))
                    }
                  />
                </Stack>
              </Grid>
            ) : null}

            {selectedCriteria === RoundJudgementCriteriaEnum.JUDGE ||
            selectedCriteria === RoundJudgementCriteriaEnum.BOTH ? (
              <Grid size={{ xs: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Judging Deadline</Typography>
                  <DateRangePickerController
                    disabled={
                      !submissionDeadline?.[0] || !submissionDeadline?.[1]
                    }
                    name="judgingDeadline"
                    control={control}
                    minDate={
                      deadline?.[0] || dayjs(Number(competition?.startDate))
                    }
                    maxDate={
                      deadline?.[1] || dayjs(Number(competition?.endDate))
                    }
                  />
                </Stack>
              </Grid>
            ) : null}

            {selectedCriteria === RoundJudgementCriteriaEnum.PUBLIC ||
            selectedCriteria === RoundJudgementCriteriaEnum.BOTH ? (
              <Grid size={{ xs: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Voting Deadline</Typography>
                  <DateRangePickerController
                    disabled={
                      !submissionDeadline?.[0] || !submissionDeadline?.[1]
                    }
                    name="votingDeadline"
                    control={control}
                    minDate={
                      deadline?.[0] || dayjs(Number(competition?.startDate))
                    }
                    maxDate={
                      deadline?.[1] || dayjs(Number(competition?.endDate))
                    }
                  />
                </Stack>
              </Grid>
            ) : null}

            {selectedCriteria === RoundJudgementCriteriaEnum.PUBLIC ||
            selectedCriteria === RoundJudgementCriteriaEnum.BOTH ? (
              <Grid size={{ xs: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Max Vote</Typography>
                  <Field.Text
                    {...register("maxVote", { valueAsNumber: true })}
                    type="number"
                    placeholder="Ex: 1,2,3..."
                  />
                </Stack>
              </Grid>
            ) : null}
            {selectedCriteria === RoundJudgementCriteriaEnum.JUDGE ||
            selectedCriteria === RoundJudgementCriteriaEnum.BOTH ? (
              <Grid size={{ xs: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Max Score</Typography>
                  <Field.Text
                    type="number"
                    {...register("maxScore", { valueAsNumber: true })}
                    placeholder="Ex: 1,2,3..."
                  />
                </Stack>
              </Grid>
            ) : null}
            <Grid size={{ xs: 4 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Max Winners</Typography>
                <Field.Text
                  type="number"
                  {...register("maxWinners", { valueAsNumber: true })}
                  placeholder="Ex: 1,2,3..."
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid sx={{ xs: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Judges
            </Typography>
            <JudgeAutocomplete name="judges" control={control} />
          </Grid>
        </Box>
        <Box>
          <Grid size={{ xs: 4 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description</Typography>
              <Field.Text
                rows={3}
                multiline
                name="description"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                variant="outlined"
              />
            </Stack>
          </Grid>
        </Box>

        <Box py={2} display={"flex"} justifyContent={"flex-end"}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress color="inherit" size={"1.5rem"} />
              ) : undefined
            }
          >
            {!recordToModify ? "Create Round" : "Save Changes"}
          </Button>
        </Box>
      </Form>
    </LocalizationProvider>
  );
};

export default RoundForm;
