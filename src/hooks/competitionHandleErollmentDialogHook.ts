import { CREATE_ENROLMENT_MUTATION } from "@/graphql-client/enrollment";
import { useMutation } from "@apollo/client";
import { useState } from "react";

type EnrollmentConfirmationDialogProps = {
  competitionId?: string;
};

export function useCompetitionHandleEnrollmentDialog() {
  const [openDialog, setOpenDialog] =
    useState<EnrollmentConfirmationDialogProps>({});
  const [createEnrolment] = useMutation(CREATE_ENROLMENT_MUTATION);

  const handleOpenEnrollmentConfirmationDialog = (id: string) => {
    setOpenDialog({
      competitionId: id,
    });
  };

  const handleCloseEnrollmentConfirmationDialog = () => {
    setOpenDialog({});
  };

  const onAgreeEnrollment = async () => {
    console.log(
      "Enrollment confirmed for competition:",
      openDialog.competitionId
    );

    try {
      const userId = "67e1d65dce15e70f613c96a6";
      const competitionId = openDialog.competitionId;

      if (competitionId) {
        const { data } = await createEnrolment({
          variables: {
            competitionId,
          },
        });

        console.log("Enrolment successful:", data);
      }
    } catch (error) {
      console.error("Failed to enroll:", error);
      if (error) {
        console.error("Network error:", error);
      }
    } finally {
      setOpenDialog({}); // Close the dialog after the operation
    }
  };
  return {
    openDialog,
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
  };
}
