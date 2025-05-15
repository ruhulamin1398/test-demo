import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";

import { z } from "zod";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  CompetitionStatusEnum,
  RoundJudgementCriteriaEnum,
  RoundStatusEnum,
  SubmissionTypeEnum,
} from "@/interfaces";
import { validateDateRangeWithin } from "./date";
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

  haveRoundWiseSubmission: Yup.boolean()
    .notRequired()
    .default(false)
    .test(
      "is-boolean",
      "haveRoundWiseSubmission must be a boolean value",
      (value) => typeof value === "boolean"
    ),

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

    submissionType: Yup.string()
      .oneOf(Object.values(SubmissionTypeEnum))
      .required("Submission Type is required"),

    judgementCriteria: Yup.string()
      .oneOf(
        Object.values(RoundJudgementCriteriaEnum),
        "Invalid judgement criteria"
      )
      .required("Judgement criteria is required"),
    maxScore: Yup.number().test(
      "maxScore-valid",
      "Max score must be a positive number",
      function (value) {
        const scores = Number(value || 0);
        const { judgementCriteria } = this.parent;
        if (
          judgementCriteria === RoundJudgementCriteriaEnum.JUDGE ||
          judgementCriteria === RoundJudgementCriteriaEnum.BOTH
        ) {
          return scores > 0;
        } else {
          return scores === 0;
        }
      }
    ),
    maxVote: Yup.number().test(
      "maxVote-valid",
      "Max vote must be a positive number",
      function (value) {
        const votes = Number(value || 0);
        const { judgementCriteria } = this.parent;
        if (
          judgementCriteria === RoundJudgementCriteriaEnum.PUBLIC ||
          judgementCriteria === RoundJudgementCriteriaEnum.BOTH
        ) {
          return votes > 0;
        } else {
          return votes === 0;
        }
      }
    ),
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

export const getRoundFormZodSchema = ({
  competitionStartDate,
  competitionEndDate,
  hasRoundWiseSubmission,
}: {
  competitionStartDate: dayjs.Dayjs;
  competitionEndDate: dayjs.Dayjs;
  hasRoundWiseSubmission: boolean;
}) => {
  const schema = z.object({
    title: z.string().min(4).nonempty(),
    roundNumber: z.number().positive(),
    deadline: z
      .tuple([
        z.custom<dayjs.Dayjs | null>(() => true),
        z.custom<dayjs.Dayjs | null>(() => true),
      ])
      .optional(),
    submissionDeadline: z
      .tuple([
        z.custom<dayjs.Dayjs | null>(() => true),
        z.custom<dayjs.Dayjs | null>(() => true),
      ])
      .optional(),
    submissionType: z.enum(
      Object.values(SubmissionTypeEnum) as [string, ...string[]]
    ),
    judgementCriteria: z.enum(
      Object.values(RoundJudgementCriteriaEnum) as [string, ...string[]]
    ),
    maxScore: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number().optional()
    ),

    maxVote: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number().optional()
    ),
    maxWinners: z.preprocess(
      (val) =>
        val === "" || val === null || val === undefined
          ? undefined
          : Number(val),
      z
        .number({ invalid_type_error: "Winners must be a number" })
        .min(1, "Score must be greater than 0")
    ),
    isActiveRound: z.boolean(),
    description: z.string().min(4).nonempty(),
    status: z.enum(Object.values(RoundStatusEnum) as [string, ...string[]]),
    judges: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          profilePicture: z.string().url().optional(),
        })
      )
      .default([]),
  });

  return schema.superRefine((data, ctx) => {
    const [roundStart, roundEnd] = data.deadline as [
      dayjs.Dayjs | null,
      dayjs.Dayjs | null
    ];
    const roundErrors = validateDateRangeWithin({
      start: roundStart,
      end: roundEnd,
      min: competitionStartDate,
      max: competitionEndDate,
      label: "Round period",
    });
    if (roundErrors) {
      ctx.addIssue({
        path: ["deadline"],
        message: "Deadline should be in valid range.",
        code: "custom",
      });
    }

    if (hasRoundWiseSubmission) {
      if (data.submissionDeadline) {
        const [subStart, subEnd] = data.submissionDeadline;
        if (roundStart && roundEnd) {
          const submissionErrors = validateDateRangeWithin({
            start: subStart,
            end: subEnd,
            min: roundStart,
            max: roundEnd,
            label: "Submission period",
          });
          if (submissionErrors) {
            ctx.addIssue({
              path: ["submissionDeadline"],
              message: "Submission deadline should be valid",
              code: "custom",
            });
          }
        } else {
          ctx.addIssue({
            path: ["submissionDeadline"],
            message: "Submission deadline should be valid",
            code: "custom",
          });
        }
      } else {
        ctx.addIssue({
          path: ["submissionDeadline"],
          message: "Submission deadline should be valid",
          code: "custom",
        });
      }
    }
    if (
      data.judgementCriteria === "Judges" ||
      data.judgementCriteria === "Both"
    ) {
      if (!data.maxScore || data.maxScore <= 0) {
        ctx.addIssue({
          path: ["maxScore"],
          message: "Max score is required and min 1.",
          code: "custom",
        });
      }
    }

    if (
      data.judgementCriteria === "Vote" ||
      data.judgementCriteria === "Both"
    ) {
      if (!data.maxVote || data.maxVote <= 0) {
        ctx.addIssue({
          path: ["maxVote"],
          message: "Max vote must be greater than 0 when using VOTING criteria",
          code: "custom",
        });
      }
    }
    if (data.maxWinners <= 0) {
      ctx.addIssue({
        path: ["maxWinners"],
        message: "Max winners must be greater than 0",
        code: "custom",
      });
    }
  });
};
