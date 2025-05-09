import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Upload } from "../upload";
import { useFileUpload } from "@/app/hooks/useFileUpload";
import { ConfirmDialog } from "../custom-dialog";

import { toast } from "@/components/snackbar";
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

  const handleOpenDialog = () => {
    setIsOpenConfirmationDialog(true);
  };
  const handleConfirmationDialog = async () => {
    setIsOpenConfirmationDialog(false);
    await handleUpload();
  };

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);
  const handleUpload = async () => {
    console.log(!file, !competitionId);
    if (!file || !competitionId) return;
    try {
      const uploadbleContent = file as File;
      const response = await uploadFile(
        uploadbleContent,
        `/api/upload/competition-image`,
        {
          competitionId: competitionId,
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
  return (
    <>
      <Card sx={{ my: 2 }}>
        {/* <CardHeader title={title} subheader={date} /> */}
        <CardContent>
          <Upload
            value={file}
            onDrop={handleDropSingleFile}
            onDelete={() => setFile(null)}
          />
        </CardContent>
        <CardActions>
          <Box
            sx={{ px: 2, flex: 1, pb: 2 }}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              disabled={!competitionId || !file}
              onClick={handleOpenDialog}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </CardActions>
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
