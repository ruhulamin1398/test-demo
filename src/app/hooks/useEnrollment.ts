import { ENROLMENT_MUTATION } from "@/graphql-client/enrolment";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "@/components/snackbar";

import { handleGraphQLError } from "@/utils/errorHandling";
import { useDispatch } from "react-redux";
import { updateEnrollIds } from "@/store/slices/authSlice";

type EnrolmentConfirmationDialogProps = {
  competitionId?: string;
};

export const useEnrollment = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] =
    useState<EnrolmentConfirmationDialogProps>({});
  const [createEnrolment, { loading, error, data }] =
    useMutation(ENROLMENT_MUTATION);

  const handleOpenEnrolmentConfirmationDialog = (id: string) => {
    setOpenDialog({
      competitionId: id,
    });
  };

  const handleCloseEnrolmentConfirmationDialog = () => {
    setOpenDialog({});
  };
  const onAgreeEnrolment = async () => {
    if (openDialog?.competitionId) {
      const response = await createEnrolment({
        variables: {
          competitionId: openDialog?.competitionId,
        },
      });
      console.log(response);
      if (response.data?.createEnrolment) {
        const { competitionId } = response.data.createEnrolment;
        dispatch(updateEnrollIds({ enrollId: competitionId }));
        toast.dismiss();
        toast.success("Enrolment successfull.");
      }
    }

    handleCloseEnrolmentConfirmationDialog();
  };

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading("Enrolment in progress.");
    }
    if (data && data.createEnrolment && !loading) {
      setOpenDialog({});
      toast.dismiss();
      toast.success("Enrolment successfull.");
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
    handleOpenEnrolmentConfirmationDialog,
    handleCloseEnrolmentConfirmationDialog,
    onAgreeEnrolment,
    loading,
  };
};
