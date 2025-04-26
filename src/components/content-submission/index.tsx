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
import React, { useCallback, useState } from "react";
import { Upload } from "../upload";
import { useFileUpload } from "@/app/hooks/useFileUpload";

type Props = {
  competitionId: string;
};

const ContentSubmission = ({ competitionId }: Props) => {
  const { uploadFile, isLoading, progress, error } = useFileUpload();
  const [file, setFile] = useState<File | string | null>(null);
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
      const response = await uploadFile(uploadbleContent, "/api/upload", {
        competitionId: competitionId,
      });
      if (response.data) {
        // TODO: Handle the uploaded image URL here if you want to display it after upload
      } else {
        // TODO: Handle error
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
      <CardHeader
        title="Submit Your Content Before the Deadline"
        subheader="September 14, 2026"
      />
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
            onClick={handleUpload}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ContentSubmission;
