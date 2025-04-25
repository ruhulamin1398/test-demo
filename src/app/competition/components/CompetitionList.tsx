import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";

import { CompetitionItem } from "./CompetitionItem";
import { CompetitionItemSkeleton } from "./CompetitionItemSkeleton";
import { ICompetition } from "@/interfaces";
import { SingleCompetitionCard } from "@/sections/common/single-competition-card";
import { useCompetitionHandleEnrollmentDialog } from "@/actions/competitionHandleErollmentDialog";
import EnrollmentConfirmationDialog from "@/components/confirmation-dialog";

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
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
  } = useCompetitionHandleEnrollmentDialog();

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
        handleEnrollment={handleOpenEnrollmentConfirmationDialog}
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
        <EnrollmentConfirmationDialog
          open={!!openDialog?.competitionId}
          onAgree={onAgreeEnrollment}
          onDisagree={handleCloseEnrollmentConfirmationDialog}
        />
      </Box>
    </>
  );
}
