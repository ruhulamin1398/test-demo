import { ENROLMENT_MUTATION } from "@/graphql-client/enrolment";
import { useMutation } from "@apollo/client";
import { useState } from "react";

type EnrollmentConfirmationDialogProps = {
  competitionId?: string;
};

export function useCompetitionHandleEnrollmentDialog() {
  const [openDialog, setOpenDialog] =
    useState<EnrollmentConfirmationDialogProps>({});
  const [
    createEnrollment,
    { loading: createLoading, error: createError, data: enerolment },
  ] = useMutation(ENROLMENT_MUTATION);

  const handleOpenEnrollmentConfirmationDialog = (id: string) => {
    setOpenDialog({
      competitionId: id,
    });
  };

  const handleCloseEnrollmentConfirmationDialog = () => {
    setOpenDialog({});
  };
  const onAgreeEnrollment = async () => {
    if (openDialog?.competitionId)
      await createEnrollment({
        variables: {
          competitionId: openDialog?.competitionId,
        },
      });
    handleCloseEnrollmentConfirmationDialog();
  };
  return {
    openDialog,
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
  };
}
