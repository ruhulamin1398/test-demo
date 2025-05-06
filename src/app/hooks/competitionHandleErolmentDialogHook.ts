import { ENROLMENT_MUTATION } from "@/graphql-client/enrolment";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "@/components/snackbar";

import { handleGraphQLError } from "@/utils/errorHandling";

type EnrolmentConfirmationDialogProps = {
  competitionId?: string;
};

export function useCompetitionHandleEnrolmentDialog() {
  const [openDialog, setOpenDialog] =
    useState<EnrolmentConfirmationDialogProps>({});
  const [
    createEnrolment,
    { loading: createLoading, error: createError, data: enerolment },
  ] = useMutation(ENROLMENT_MUTATION);

  const handleOpenEnrolmentConfirmationDialog = (id: string) => {
    setOpenDialog({
      competitionId: id,
    });
  };

  const handleCloseEnrolmentConfirmationDialog = () => {
    setOpenDialog({});
  };
  const onAgreeEnrolment = async () => {
    if (openDialog?.competitionId)
      await createEnrolment({
        variables: {
          competitionId: openDialog?.competitionId,
        },
      });
    handleCloseEnrolmentConfirmationDialog();
  };

  useEffect(() => {
    if (createLoading) {
      toast.dismiss();
      toast.loading("Enrolment in progress.");
    }
    if (enerolment) {
      setOpenDialog({});
      toast.dismiss();
      toast.success("Enrolment successfull.");
    }
    if (createError) {
      setOpenDialog({});
      toast.dismiss();
      const errorMessage = handleGraphQLError(createError);
      toast.error(errorMessage);
    }
  }, [enerolment, createError, createLoading]);
  return {
    openDialog,
    handleOpenEnrolmentConfirmationDialog,
    handleCloseEnrolmentConfirmationDialog,
    onAgreeEnrolment,
    createLoading,
  };
}
