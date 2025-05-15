import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid2 as Grid,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Upload } from "../upload";
import { useFileUpload } from "@/app/hooks/useFileUpload";
import { ConfirmDialog } from "../custom-dialog";

import { toast } from "@/components/snackbar";
import { Field, Form, Formik } from "formik";
import { SubmissionValidationSchema } from "@/utils/ypu-validation";
import { OutlinedTextField } from "../atoms/OutlinedTextField";
import { IEnrolmentSubmissionInput } from "@/interfaces/enrolmentSubmission";
type Props = {
  competitionId: string;
  title: string;
  date: string;
  refetch: () => void;
};

const UploadSubmissionFile = ({
  competitionId,
  title,
  date,
  refetch,
}: Props) => {
  const { uploadFile, isLoading, progress, error } = useFileUpload();

  const [file, setFile] = useState<File | string | null>(null);
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] =
    useState(false);

  useEffect(() => {
    if (error) {
      console.log("error", error);
      toast.dismiss();
      toast.error(error);
    }
    if (isLoading) {
      toast.dismiss();
      toast.loading("Uploading...");
    }
  }, [error, isLoading, progress]);

  const handleOpenDialog = (e: any) => {
    e.preventDefault();
    setIsOpenConfirmationDialog(true);
  };
  const handleConfirmationDialog = async () => {
    setIsOpenConfirmationDialog(false);
    // await handleUpload();
  };

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);
  const handleUpload = async (values: unknown) => {
    const payloads = values as IEnrolmentSubmissionInput;
    if (!file || !competitionId) return;
    const { title, description } = payloads;
    try {
      const uploadbleContent = file as File;
      const response = await uploadFile(
        uploadbleContent,
        `/api/upload/competition-image`,
        {
          competitionId: competitionId,
          title: title,
          description: description,
        }
      );
      if (response.data) {
        toast.dismiss();
        console.log(response.data);
        toast.success("Upload successful");
        refetch();
        setFile(null);

        // TODO: Handle the uploaded image URL here if you want to display it after upload
      } else {
        toast.dismiss();
        console.log("Something went wrong");
        // TODO: Handle error
      }
    } catch (err) {
      console.log("err");
    }
  };

  const initialFormValues = {
    title: "",
    description: "",
  };

  return (
    <>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Formik
            initialValues={initialFormValues}
            validationSchema={SubmissionValidationSchema}
            onSubmit={handleUpload}
            validateOnBlur
            validateOnChange
            enableReinitialize={true}
            validateOnMount
          >
            {({ values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Field
                      name="title"
                      label="Title"
                      component={OutlinedTextField}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Field
                      label="Descrption"
                      name="description"
                      component={OutlinedTextField}
                    />
                  </Grid>
                  <Upload
                    value={file}
                    onDrop={handleDropSingleFile}
                    onDelete={() => setFile(null)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!competitionId || !file}
                    // onClick={handleOpenDialog}
                  >
                    Submit
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <ConfirmDialog
        title={"Do you want to submit?"}
        open={isOpenConfirmationDialog}
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmationDialog}
          >
            Confirm
          </Button>
        }
        onClose={() => {
          setIsOpenConfirmationDialog(false);
        }}
      />
    </>
  );
};

export default UploadSubmissionFile;
