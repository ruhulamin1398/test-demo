import { useState } from "react";

type EnrollmentConfirmationDialogProps = {
  competitionId?: string;
};

export function useCompetitionHandleEnrollmentDialog() {
  const [openDialog, setOpenDialog] =
    useState<EnrollmentConfirmationDialogProps>({});

  const handleOpenEnrollmentConfirmationDialog = (id: string) => {
    setOpenDialog({
      competitionId: id,
    });
  };

  const handleCloseEnrollmentConfirmationDialog = () => {
    setOpenDialog({});
  };

  const onAgreeEnrollment = () => {
    console.log(
      "Enrollment confirmed for competition:",
      openDialog.competitionId
    );
    setOpenDialog({});
  };

  return {
    openDialog,
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
  };
}
