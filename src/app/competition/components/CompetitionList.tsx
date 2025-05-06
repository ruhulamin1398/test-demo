import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";

import { CompetitionItem } from "./CompetitionItem";
import { CompetitionItemSkeleton } from "./CompetitionItemSkeleton";
import { ICompetition } from "@/interfaces";
import { SingleCompetitionCard } from "@/sections/common/single-competition-card";
import { useCompetitionHandleEnrolmentDialog } from "@/app/hooks/competitionHandleErolmentDialogHook";
import EnrolmentConfirmationDialog from "@/components/confirmation-dialog";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  competitions: ICompetition[];
};

export function CompetitionList({
  competitions,
  loading,
  sx,
  ...other
}: Props) {
  const {
    openDialog,
    handleOpenEnrolmentConfirmationDialog,
    handleCloseEnrolmentConfirmationDialog,
    onAgreeEnrolment,
    createLoading,
  } = useCompetitionHandleEnrolmentDialog();

  const renderLoading = () => <CompetitionItemSkeleton />;

  const renderList = () =>
    competitions.map((competition) => (
      // <CompetitionItem
      //   key={competition.id}
      //   competition={competition}
      //   detailsHref={"add-path-later"}
      // />

      <SingleCompetitionCard
        key={competition.id}
        item={competition}
        handleEnrolment={handleOpenEnrolmentConfirmationDialog}
      />
    ));

  return (
    <>
      <Box
        sx={[
          () => ({
            gap: 3,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {loading ? renderLoading() : renderList()}
        <EnrolmentConfirmationDialog
          open={!!openDialog?.competitionId}
          onAgree={onAgreeEnrolment}
          onDisagree={handleCloseEnrolmentConfirmationDialog}
          createLoading={createLoading}
        />
      </Box>
    </>
  );
}
