import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "@/components/snackbar";

import { handleGraphQLError } from "@/utils/errorHandling";
import { useDispatch } from "react-redux";
import { updateEnrollIds } from "@/store/slices/authSlice";
import { ENROLMENT_MUTATION } from "@/graphql-client/enrolment";

type EnrollmentConfirmationDialogProps = {
  competitionId?: string;
};

export const useEnrollment = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] =
    useState<EnrollmentConfirmationDialogProps>({});
  const [createEnrollment, { loading, error, data }] =
    useMutation(ENROLMENT_MUTATION);

  const handleOpenEnrollmentConfirmationDialog = (id: string) => {
    setOpenDialog({
      competitionId: id,
    });
  };

  const handleCloseEnrollmentConfirmationDialog = () => {
    setOpenDialog({});
  };
  const onAgreeEnrollment = async () => {
    if (openDialog?.competitionId) {
      const response = await createEnrollment({
        variables: {
          competitionId: openDialog?.competitionId,
        },
      });
      console.log(response);
      if (response.data?.createEnrollment) {
        const { competitionId } = response.data.createEnrollment;
        dispatch(updateEnrollIds({ enrollId: competitionId }));
        toast.dismiss();
        toast.success("Enrollment successfull.");
      }
    }

    handleCloseEnrollmentConfirmationDialog();
  };

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading("Enrollment in progress.");
    }
    if (data && data.createEnrollment && !loading) {
      setOpenDialog({});
      toast.dismiss();
      toast.success("Enrollment successfull.");
    }
    if (error) {
      setOpenDialog({});
      toast.dismiss();
      const errorMessage = handleGraphQLError(error);
      toast.error(errorMessage);
    }
  }, [loading, data, error]);
  return {
    openDialog,
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
    loading,
  };
};
