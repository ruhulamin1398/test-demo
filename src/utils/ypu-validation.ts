import * as Yup from "yup";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  CompetitionStatusEnum,
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
  SubmissionTypeEnum,
} from "@/interfaces";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Define the context type
interface RoundFormValidationContext {
  competitionStartDate: string; // Competition start date
  competitionEndDate: string; // Competition end date
}

export const competitionFormValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  // Start Date: Must be on or after today
  startDate: Yup.date()
    .required("Start Date is required")
    .min(dayjs().startOf("day"), "Start date must be today or in the future"),

  // End Date: Must be greater than or equal to Start Date
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End date must be on or after the start date"),
  enrolmentDeadline: Yup.object({
    startDate: Yup.date()
      .required("Enrolment Start Date is required")
      .test(
        "enrolment-startdate-valid",
        "Enrolment start date must be between competition start and end date",
        function (value) {
          const rootStartDate = this.options.context?.startDate; // Access root startDate
          const rootEndDate = this.options.context?.endDate; // Access root endDate
          // Ensure enrolment start date is within the competition start and end dates
          const minValid = dayjs(value).isSameOrAfter(
            dayjs(rootStartDate),
            "day"
          );
          const maxValid = dayjs(value).isSameOrBefore(
            dayjs(rootEndDate),
            "day"
          );

          return minValid && maxValid;
        }
      ),

    // Enrolment Deadline End Date:
    endDate: Yup.date()
      .required("Enrolment End Date is required")
      .test(
        "enrolment-startdate-valid",
        "Enrolment start date must be between competition start and end date",
        function (value) {
          const { startDate } = this.parent; // Access root startDate
          const rootEndDate = this.options.context?.endDate; // Access root endDate

          // Ensure enrolment start date is within the competition start and end dates
          const minValid = dayjs(value).isSameOrAfter(dayjs(startDate), "day");
          const maxValid = dayjs(value).isSameOrBefore(
            dayjs(rootEndDate),
            "day"
          );

          return minValid && maxValid;
        }
      ),
  }),
  enrolmentType: Yup.string()
    .oneOf(["Free", "Paid"])
    .required("Enrolment Type is required"),
  price: Yup.number()
    .when("enrolmentType", {
      is: (enrolmentType: string) => enrolmentType === "Paid",
      then: (schema) =>
        schema
          .required("Price is required for paid enrolments")
          .min(1, "Price must be greater than 0"),
      otherwise: (schema) => schema.nullable(),
    })
    .nullable(),
  mediaUrl: Yup.string().notRequired(),
  submissionType: Yup.string()
    .oneOf(Object.values(SubmissionTypeEnum))
    .required("Submission Type is required"),
  status: Yup.string()
    .oneOf(Object.values(CompetitionStatusEnum))
    .required("Status is required"),
});

// Define the Yup validation schema
export const roundFormValidationSchema = ({
  competitionStartDate,
  competitionEndDate,
}: {
  competitionStartDate: dayjs.Dayjs;
  competitionEndDate: dayjs.Dayjs;
}) => {
  return Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(4, "Title should be minimum 4 characters."),
    roundNumber: Yup.number()
      .required("Round number is required")
      .positive("Must be a positive number"),
    startDate: Yup.date()
      .required("Start date is required")
      .test(
        "round-startdate-valid",
        "Round start date must be between competition start and end date",
        function (value) {
          // Ensure the value is within the competition range
          const isValidStartDate = dayjs(value).isSameOrAfter(
            competitionStartDate,
            "day"
          );
          const isValidEndDate = dayjs(value).isSameOrBefore(
            competitionEndDate,
            "day"
          );
          // Return true only if the value is within both start and end date range
          return isValidStartDate && isValidEndDate;
        }
      ),
    endDate: Yup.date()
      .required("End date is required")
      .test(
        "enrolment-startdate-valid",
        "Enrolment start date must be between competition start and end date",
        function (value) {
          const { startDate } = this.parent; // Access root startDate
          // Ensure enrolment start date is within the competition start and end dates
          const minValid = dayjs(value).isSameOrAfter(dayjs(startDate), "day");
          const maxValid = dayjs(value).isSameOrBefore(
            dayjs(competitionEndDate),
            "day"
          );
          return minValid && maxValid;
        }
      ),
    submissionStartDate: Yup.date()
      .required("Submission start date is required")
      .test(
        "submission-startdate-valid",
        "Submission start date must be between round start and end date",
        function (value) {
          const { startDate, endDate } = this.parent;
          const isAfterStartDate = dayjs(value).isSameOrAfter(
            dayjs(startDate),
            "day"
          );
          const isBeforeEndDate = dayjs(value).isSameOrBefore(
            dayjs(endDate),
            "day"
          );
          return isAfterStartDate && isBeforeEndDate;
        }
      ),
    submissionEndDate: Yup.date()
      .required("Submission end date is required")
      .test(
        "submission-enddate-valid",
        "Submission end date must be between submission start date and round end date",
        function (value) {
          const { submissionStartDate, endDate } = this.parent;
          const isAfterSubmissionStartDate = dayjs(value).isSameOrAfter(
            dayjs(submissionStartDate),
            "day"
          );
          const isBeforeEndDate = dayjs(value).isSameOrBefore(
            dayjs(endDate),
            "day"
          );
          return isAfterSubmissionStartDate && isBeforeEndDate;
        }
      ),
    judgementCriteria: Yup.string()
      .oneOf(
        Object.values(RoundJudgementCriteriaEnum),
        "Invalid judgement criteria"
      )
      .required("Judgement criteria is required"),
    maxScore: Yup.number()
      .required("Max score is required")
      .positive("Must be a positive number"),
    description: Yup.string()
      .required("Description is required")
      .min(4, "Title should be minimum 4 characters."),
    status: Yup.string()
      .oneOf(Object.values(RoundStatusEnum), "Invalid status")
      .required("Status is required"),
  });
};

export const prizeFormValidationSchema = Yup.object({
  position: Yup.number()
    .required("Position is required")
    .positive("Position must be a positive number"),
  totalAwardws: Yup.number()
    .required("Position is required")
    .positive("Total Awardws must be a positive number"),
  rewards: Yup.string()
    .required("Rewards is required")
    .min(4, "Rewards should be minimum 4 chatacters."),
  title: Yup.string()
    .required("Title is required")
    .min(4, "Title should be minimum 4 characters."),
});
