"use client";
import React, { ChangeEvent, useEffect } from "react";
import {
  MenuItem,
  Button,
  Grid2 as Grid,
  CircularProgress,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import { useMutation } from "@apollo/client";
import {
  CREATE_COMPETITION,
  UPDATE_COMPETITION,
} from "@/graphql-client/competition"; // Define your GraphQL mutations here
import CustomDatePicker from "../atoms/CustomDatepicker";
import {
  CompetitionStatusEnum,
  EnrolmentTypeEnum,
  ICompetition,
  SubmissionTypeEnum,
} from "@/interfaces";
import useNotification from "@/app/hooks/useNotification";
import { handleGraphQLError } from "@/utils/errorHandling";
import { formatDateForDatePicker } from "@/utils/date";
import {
  CheckCircleOutline,
  PublishedWithChangesOutlined,
} from "@mui/icons-material";
import { competitionFormValidationSchema } from "@/utils/ypu-validation";
import { OutlinedTextField } from "../atoms/OutlinedTextField";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  CompetitionUiModeEnum,
  setCompetition,
  setUiControlsBasicInfo,
} from "@/store/slices/competitionSlice";

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

  const handleSubmit = async (values: unknown, actions: any) => {
    console.log(values, "Hello");
    const payloads = { ...(values as ICompetition) }; // Ensure you're spreading values
    payloads.price = convertPriceToNumber(payloads.price.toString());

    try {
      if (!recordToModify) {
        await createCompetition({
          variables: {
            input: payloads,
          },
        });
      } else {
        const {
          id,
          rounds: _skipRounds,
          prizes: _skipPrizes,
          eligibility: _eligibility,
          ...updatedPayload
        } = payloads;
        await updateCompetition({
          variables: {
            id: id,
            input: updatedPayload,
          },
        });
      }
      actions.setSubmitting(false); // Once the mutation is complete
    } catch (error) {
      actions.setSubmitting(false); // Stop submission spinner
      console.error("Error during submit:", error);
    }
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

  const initialValues = {
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    enrolmentDeadline: {
      startDate: null,
      endDate: null,
    },
    enrolmentType: "Free",
    price: 0,
    mediaUrl: "",
    submissionType: "Photo",
    status: CompetitionStatusEnum.DRAFT,
    haveRoundWiseSubmission: true,
  };

  const competitionValues = recordToModify
    ? {
        ...recordToModify,
        startDate: formatDateForDatePicker(recordToModify.startDate),
        endDate: formatDateForDatePicker(recordToModify.endDate),
        enrolmentDeadline: {
          startDate: formatDateForDatePicker(
            recordToModify.enrolmentDeadline?.startDate
          ),
          endDate: formatDateForDatePicker(
            recordToModify.enrolmentDeadline?.endDate
          ),
        },
        haveRoundWiseSubmission:
          recordToModify.haveRoundWiseSubmission ?? false,
      }
    : initialValues;

  return (
    <Formik
      validateOnBlur
      validateOnChange
      initialValues={competitionValues}
      validationSchema={competitionFormValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} // Reinitialize form values when `competition` prop changes
    >
      {({ setFieldValue, values, isValid, isSubmitting, errors }) => {
        console.log("values", values, isValid, errors);
        return (
          <Form>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid size={12}>
                <Field
                  label="Title"
                  name="title"
                  component={OutlinedTextField}
                />
              </Grid>

              {/* Description */}
              <Grid size={12}>
                <Field
                  rows={2}
                  multiline
                  label="Description"
                  name="description"
                  component={OutlinedTextField}
                />
              </Grid>

              {/* Start Date */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="startDate"
                  label="Start Date"
                  component={CustomDatePicker}
                />
              </Grid>

              {/* End Date */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="endDate"
                  label="End Date"
                  component={CustomDatePicker}
                />
              </Grid>

              {/* Enrolment Deadline Start */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="enrolmentDeadline.startDate"
                  label="Enrolment Deadline Start"
                  component={CustomDatePicker}
                />
              </Grid>

              {/* Enrolment Deadline End */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="enrolmentDeadline.endDate"
                  label="Enrolment Deadline End"
                  component={CustomDatePicker}
                />
              </Grid>

              {/* Enrolment Type */}
              <Grid size={{ xs: 6, sm: 3 }}>
                <Field
                  label="Enrolment Type"
                  name="enrolmentType"
                  component={OutlinedTextField}
                  select
                  onChange={(
                    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => {
                    if (e.target.value === "Free") {
                      setFieldValue("price", 0);
                    } else {
                      setFieldValue("price", recordToModify?.price || 0);
                    }
                  }}
                >
                  {Object.values(EnrolmentTypeEnum).map((enrolType) => (
                    <MenuItem key={enrolType} value={enrolType}>
                      {enrolType}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              {/* Price */}
              {values.enrolmentType === "Paid" && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Field
                    label="Price"
                    name="price"
                    component={OutlinedTextField}
                  />
                </Grid>
              )}

              {/* Have Round-Wise Submission */}
              <Grid size={{ xs: 6, sm: 3 }}>
                <Field name="haveRoundWiseSubmission">
                  {({ field }: FieldProps) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Round Wise Submission"
                    />
                  )}
                </Field>
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

              {/* Status */}
              <Grid size={{ xs: 6, sm: 3 }}>
                <Field
                  label="Status"
                  name="status"
                  component={OutlinedTextField}
                  select
                >
                  {Object.values(CompetitionStatusEnum).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>
            <Box py={2} display={"flex"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  createLoading || updateLoading || !isValid || isSubmitting
                }
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
                {!recordToModify ? "Create Competition" : "Save Changes"}
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CompetitionForm;
