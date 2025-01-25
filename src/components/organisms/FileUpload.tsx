import React, { useState } from "react";
import { useFileUpload } from "@/app/hooks/useFileUpload"; // Assuming you place useFileUpload in a separate file.
import { Box, Typography, LinearProgress } from "@mui/material";
import { CloudUpload, Photo } from "@mui/icons-material"; // MUI's cloud upload icon
import { styled } from "@mui/system";
import Image from "next/image"; // Using Next.js Image component
import useNotification from "@/app/hooks/useNotification";

// const goldenRatio = 1.618;

// Styled Box for the Thumbnail Upload Container with Golden Aspect Ratio
const UploadContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingBottom: `calc(100% / 4)`, // Set the aspect ratio using the golden ratio
  backgroundColor: theme.palette.grey[300], // Default background color
  borderRadius: "8px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "&:hover .upload-icon-overlay": {
    // opacity: 1, // Show overlay when hovering
  },
}));

// Styled Icon Button for Upload Icon with Overlay Effect
const UploadIconOverlay = styled(Box)(({}) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background color
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // opacity: 0,
  transition: "opacity 0.3s ease",
  "&:hover .upload-icon-overlay": {
    // opacity: 1, // Show overlay when hovering
  },
}));

const FileUpload: React.FC<{
  id?: string;
  onSuccess?: (url: string) => void;
  currentImage?: string;
}> = ({ id, onSuccess, currentImage }) => {
  const { notify } = useNotification();
  const { uploadFile, isLoading, progress, error } = useFileUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      // Generate image URL for preview (if it's an image file)
      const objectUrl = URL.createObjectURL(file);
      // Trigger the upload immediately after file is selected
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    if (!id) {
      notify({
        severity: "error",
        message: "Please select a competition first.",
      });
      return;
    }

    const payload = { id };

    try {
      const response = await uploadFile(file, "/api/upload", payload);
      if (response.data) {
        onSuccess?.(response.data.mediaUrl);
        notify({
          severity: "success",
          message: "Image has been upload successfully.",
        });
        // Handle the uploaded image URL here if you want to display it after upload
        // setImageUrl(response.imageUrl); // If response contains the image URL
      } else {
        notify({
          severity: "error",
          message: response.message || "Something wents wronng. Upload failed.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box>
        {/* Thumbnail Upload Container */}
        <Box mb={2}>
          <UploadContainer
            onClick={() => document.getElementById("file-input")?.click()}
          >
            {/* Display the image if available, otherwise show the default icon */}
            {currentImage ? (
              <Image
                src={currentImage}
                alt="Uploaded thumbnail"
                layout="fill"
                objectFit="cover"
                quality={75}
              />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                  left: 0,
                }}
              >
                <Box>
                  <Photo sx={{ width: "200px", height: "200px" }} />
                </Box>
              </Box>
            )}

            <UploadIconOverlay className="upload-icon-overlay">
              <CloudUpload sx={{ fontSize: 48, color: "#fff" }} />
            </UploadIconOverlay>
            <input
              type="file"
              id="file-input"
              hidden
              onChange={handleFileChange}
            />
          </UploadContainer>
        </Box>

        {/* Upload Progress */}
        {isLoading && (
          <Box mb={2}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" color="textSecondary" align="center">
              {progress}% completed
            </Typography>
          </Box>
        )}

        {/* Error Message */}
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default FileUpload;
