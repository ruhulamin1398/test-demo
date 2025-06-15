import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";

import { CompetitionItemSkeleton } from "./CompetitionItemSkeleton";
import { ICompetition } from "@/interfaces";
import SingleCompetitionCard from "@/sections/common/single-competition-card";
import { useEnrollment } from "@/app/hooks/useEnrollment";
import EnrollmentConfirmationDialog from "@/components/confirmation-dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  competitions: ICompetition[];
};

export function CompetitionList({
  competitions,
  loading: fetchCompetitionsLoading,
  sx,
  ...other
}: Props) {
  const { enrollIds } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );
  const {
    openDialog,
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
    loading,
  } = useEnrollment();

  const renderLoading = () => <CompetitionItemSkeleton />;

  const renderList = () =>
    competitions.map((competition) => (
      <SingleCompetitionCard
        key={competition.id}
        item={competition}
        handleEnrollment={handleOpenEnrollmentConfirmationDialog}
        isEnrolled={enrollIds.includes(competition.id)}
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
        {fetchCompetitionsLoading ? renderLoading() : renderList()}
        <EnrollmentConfirmationDialog
          open={!!openDialog?.competitionId}
          onAgree={onAgreeEnrollment}
          onDisagree={handleCloseEnrollmentConfirmationDialog}
          createLoading={loading}
        />
      </Box>
    </>
  );
}
