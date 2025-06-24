import { ISubmissionData } from "@/_mock/data";
import { ConfirmDialog } from "@/components/custom-dialog";
import RoundDetails from "./round-details";
import { IRound } from "@/interfaces";

type Props = {
  round: IRound | null;
  handleDialogClose: () => void;
};

const CompetitionRoundPopUp = ({
  round,
  handleDialogClose,

  ...other
}: Props) => {
  return (
    <>
      <ConfirmDialog
        open={!!round}
        content={<RoundDetails round={round} />}
        action={<></>}
        closeText="Close"
        onClose={handleDialogClose}
      />
    </>
  );
};
export default CompetitionRoundPopUp;
