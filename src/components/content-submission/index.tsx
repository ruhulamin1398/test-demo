import { Card, CardContent, CardHeader, Container } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Upload } from "../upload";
import { useFileUpload } from "@/app/hooks/useFileUpload";

type Props = {
  competitionId: string;
  competitionTitle: string;
  competitionNameSubtitle: string;
};

const ContentSubmission = (props: Props) => {
  const { uploadFile, isLoading, progress, error } = useFileUpload();
  const { competitionId } = props;
  const [file, setFile] = useState<File | string | null>(null);
  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);
  const handleUpload = async () => {
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
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Upload
          value={file}
          onDrop={handleDropSingleFile}
          onDelete={() => setFile(null)}
        />
      </CardContent>
    </Card>
  );
};

export default ContentSubmission;
