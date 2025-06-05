"use client";
import React, { useEffect } from "react";
import {
  MenuItem,
  Button,
  Grid2 as Grid,
  CircularProgress,
  Box,
  Stack,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Field, Form } from "@/components/hook-form";
import { useMutation } from "@apollo/client";
import {
  CREATE_COMPETITION,
  UPDATE_COMPETITION,
} from "@/graphql-client/competition"; // Define your GraphQL mutations here
import {
  CompetitionStatusEnum,
  EnrollmentTypeEnum,
  ICompetition,
} from "@/interfaces";
import useNotification from "@/app/hooks/useNotification";
import { handleGraphQLError } from "@/utils/errorHandling";
import { competitionFormValidationZodSchema } from "@/utils/ypu-validation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  CompetitionUiModeEnum,
  setCompetition,
  setUiControlsBasicInfo,
} from "@/store/slices/competitionSlice";
import { DateRangePickerController } from "@/components/date-range-picker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@/locales";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type CompetitionFormInputs = z.infer<typeof competitionFormValidationZodSchema>;

// Competition Form component
const CompetitionForm = () => {
  const dispatch = useDispatch();
  const recordToModify = useSelector(
    (state: RootState) =>
      state.competition.uiControls.basicInfoUi.recordToModify as ICompetition
  );
  const { notify } = useNotification();

  // GraphQL Mutation hooks
  const [
    createCompetition,
    { loading: createLoading, error: createError, data },
  ] = useMutation(CREATE_COMPETITION);
  const [
    updateCompetition,
    { loading: updateLoading, error: updateError, data: updatedData },
  ] = useMutation(UPDATE_COMPETITION);

  const convertPriceToNumber = (value: string) => {
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return 0;
  };

  useEffect(() => {
    if (data?.createCompetition) {
      notify({
        severity: "success",
        message: "Successfully created competition!.",
      });
      dispatch(setCompetition(data.createCompetition));
      dispatch(
        setUiControlsBasicInfo({
          mode: CompetitionUiModeEnum.VIEW,
          recordToModify: undefined,
        })
      );
    }
    if (updatedData?.updateCompetition) {
      notify({
        severity: "success",
        message: "Successfully updated the competition!",
      });
      dispatch(setCompetition(updatedData.updateCompetition));
      dispatch(
        setUiControlsBasicInfo({
          mode: CompetitionUiModeEnum.VIEW,
          recordToModify: undefined,
        })
      );
    }

    if (createError) {
      notify({ severity: "error", message: handleGraphQLError(createError) });
    }
    if (updateError) {
      notify({ severity: "error", message: handleGraphQLError(updateError) });
    }
  }, [data, updatedData, createError, updateError, notify, dispatch]);

  const methods = useForm<CompetitionFormInputs>({
    resolver: zodResolver(competitionFormValidationZodSchema),
    defaultValues: {
      title: "",
      description: "",
      competitionDeadline: [null, null],
      enrollmentDeadline: [null, null],
      enrollmentType: EnrollmentTypeEnum.FREE,
      price: 0,
      mediaUrl: "",
      status: CompetitionStatusEnum.DRAFT,
      haveRoundWiseSubmission: true,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting, errors },
    trigger,
  } = methods;
  const [enrollmentType, competitionDeadline] = watch([
    "enrollmentType",
    "competitionDeadline",
  ]);

  const onSubmit: SubmitHandler<CompetitionFormInputs> = async (values) => {
    const { enrollmentDeadline, competitionDeadline, ...others } = values;
    const payloads = {
      ...others,
      ...(enrollmentDeadline
        ? {
            enrollmentDeadline: {
              startDate: enrollmentDeadline[0],
              endDate: enrollmentDeadline[1],
            },
          }
        : {}),
      ...(competitionDeadline
        ? {
            competitionDeadline: {
              startDate: competitionDeadline[0],
              endDate: competitionDeadline[1],
            },
          }
        : {}),
    }; // Ensure you're spreading values
    payloads.price = convertPriceToNumber((payloads.price || 0).toString());
    try {
      if (!recordToModify) {
        await createCompetition({
          variables: {
            input: payloads,
          },
        });
      } else {
        const { id } = recordToModify;
        await updateCompetition({
          variables: {
            id: id,
            input: payloads,
          },
        });
      }
    } catch (error) {
      console.error("Error during submit:", error);
    }
  };

  useEffect(() => {
    if (recordToModify) {
      const { id, competitionDeadline, enrollmentDeadline, ...others } =
        recordToModify;
      const newCompetitionDeadline: [dayjs.Dayjs | null, dayjs.Dayjs | null] = [
        competitionDeadline
          ? dayjs(Number(competitionDeadline.startDate))
          : null,
        competitionDeadline ? dayjs(Number(competitionDeadline.endDate)) : null,
      ];
      const newEenrollmentDeadline: [dayjs.Dayjs | null, dayjs.Dayjs | null] = [
        enrollmentDeadline ? dayjs(Number(enrollmentDeadline.startDate)) : null,
        enrollmentDeadline ? dayjs(Number(enrollmentDeadline.endDate)) : null,
      ];
      const modified = {
        ...others,
        competitionDeadline: newCompetitionDeadline,
        enrollmentDeadline: newEenrollmentDeadline,
        haveRoundWiseSubmission:
          recordToModify.haveRoundWiseSubmission ?? false,
      };
      reset(modified);
    }
  }, [recordToModify, reset]);

  console.log(errors);

  return (
    <LocalizationProvider>
      <Form methods={{ ...methods }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid size={12}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Name</Typography>
              <Field.Text name="title" placeholder="Ex: Eliminary round..." />
            </Stack>
          </Grid>

          {/* Description */}
          <Grid size={12}>
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

          {/* Start Date */}
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Competition Deadline</Typography>
              <DateRangePickerController
                name="competitionDeadline"
                control={control}
                minDate={dayjs()}
              />
            </Stack>
          </Grid>

          {/* Enrollment Deadline Start */}
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Enrollment Deadline</Typography>
              <DateRangePickerController
                name="enrollmentDeadline"
                control={control}
                minDate={competitionDeadline?.[0]}
                maxDate={competitionDeadline?.[1]}
              />
            </Stack>
          </Grid>

          {/* Enrollment Type */}
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Enrollment Type</Typography>
              <Field.Select
                name="enrollmentType"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              >
                {Object.values(EnrollmentTypeEnum).map((enrolType) => (
                  <MenuItem key={enrolType} value={enrolType}>
                    {enrolType}
                  </MenuItem>
                ))}
              </Field.Select>
            </Stack>
          </Grid>

          {/* Price */}
          {enrollmentType === "Paid" && (
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Round Number</Typography>
                <Field.Text name="price" placeholder="Ex: 1,2,3..." />
              </Stack>
            </Grid>
          )}
          {/* Submission Type */}
          <Grid size={{ xs: 6, sm: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Status</Typography>
              <Field.Select
                name="status"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              >
                {Object.values(CompetitionStatusEnum).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Field.Select>
            </Stack>
          </Grid>
          <Grid>
            <Box sx={{ mb: 2 }} />
            <FormControlLabel
              label="Have round wise submission"
              control={
                <Switch
                  slotProps={{ input: { id: "roundwise-submission-switch" } }}
                />
              }
              sx={{ flexGrow: 1, pl: 3 }}
            />
          </Grid>
        </Grid>
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

export default CompetitionForm;
