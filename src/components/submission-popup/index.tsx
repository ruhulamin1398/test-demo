import { ISubmissionData } from "@/_mock/data";
import { ConfirmDialog } from "@/components/custom-dialog";
import SubmissionDetails from "./submission-details";

type Props = {
  submission: ISubmissionData | null;
  handleDialogClose: () => void;
};

const CompetitionSubmissionPopUp = ({
  submission,
  handleDialogClose,

  ...other
}: Props) => {
  return (
    <>
      <ConfirmDialog
        title={""}
        open={!!submission}
        content={<SubmissionDetails submission={submission} />}
        action={<></>}
        closeText="Close"
        onClose={handleDialogClose}
      />
    </>
  );
};
export default CompetitionSubmissionPopUp;
