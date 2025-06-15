import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import isBetween from "dayjs/plugin/isBetween";
import { GET_ACTIVE_ROUND_SUBMISSION_QUERY } from "@/graphql-client/enrolment-submission";
import { SubmissionUploadSkeleton } from "@/app/submission/[id]/view/submission-upload-skeleton";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Stack,
} from "@mui/material";
import { ICompetition, IRound } from "@/interfaces";
import { useDate } from "@/hooks/use-date";
import RoundDetails from "./round-details";
import UploadSubmissionFile from "./upload-content";
import SubmittedFileInformation from "./submitted-file-information";
import RoundNoDeadlineExist from "./round-no-deadline-exist";
import NoActiveRoundFound from "./round-active-round-found";

type Props = {
  activeRound: IRound | undefined;
  competitionId: string;
  title: string;
  date: string;
};

const ContentSubmission = ({
  competitionId,
  activeRound,
  title,
  date,
}: Props) => {
  const { data, loading, error, refetch } = useQuery(
    GET_ACTIVE_ROUND_SUBMISSION_QUERY,
    {
      variables: { competitionId },
    }
  );

  const renderRoundSubmission = () => {
    dayjs.extend(isBetween);
    const isDeadlineExist =
      activeRound?.submissionDeadline.startDate &&
      activeRound?.submissionDeadline.endDate &&
      dayjs().isBetween(
        Number(activeRound.submissionDeadline.startDate),
        Number(activeRound.submissionDeadline.endDate),
        "day",
        "[]"
      );
    // console.log(
    //   "isDeadlineExist  _____",
    //   activeRound?.submissionDeadline.StartDate,
    //   activeRound?.submissionDeadline.EndDate,
    //   Math.floor(new Date().getTime()),
    //   isDeadlineExist
    // );

    return (
      <>
        {isDeadlineExist ? (
          <>
            {data?.GetActiveRoundSubmission != null ? (
              <SubmittedFileInformation
                submission={data.GetActiveRoundSubmission}
              />
            ) : (
              <UploadSubmissionFile
                competitionId={competitionId}
                title={title}
                date={date}
                refetch={refetch}
              />
            )}
          </>
        ) : (
          <RoundNoDeadlineExist round={activeRound || undefined} />
        )}
      </>
    );
  };

  return (
    <>
      {loading && <SubmissionUploadSkeleton />}

      {activeRound ? (
        <>
          <RoundDetails round={activeRound} />

          {renderRoundSubmission()}
        </>
      ) : (
        <NoActiveRoundFound />
      )}
    </>
  );
};

export default ContentSubmission;
