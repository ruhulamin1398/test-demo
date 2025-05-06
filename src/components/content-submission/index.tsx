import UploadSubmissionFile from "./upload-content";
import SubmittedFileInformation from "./submitted-file-information";
import { useQuery } from "@apollo/client";
import { GET_ACTIVE_ROUND_SUBMISSION_QUERY } from "@/graphql-client/enrolment-submission";
import { SubmissionUploadSkeleton } from "@/app/submission/[id]/view/submission-upload-skeleton";

type Props = {
  competitionId: string;
  title: string;
  date: string;
};

const ContentSubmission = ({ competitionId, title, date }: Props) => {
  const { data, loading, error, refetch } = useQuery(
    GET_ACTIVE_ROUND_SUBMISSION_QUERY,
    {
      variables: { competitionId },
    }
  );

  return (
    <>
      {loading && <SubmissionUploadSkeleton />}

      {data?.GetActiveRoundSubmission != null ? (
        <SubmittedFileInformation submission={data.GetActiveRoundSubmission} />
      ) : (
        <UploadSubmissionFile
          competitionId={competitionId}
          title={title}
          date={date}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ContentSubmission;
