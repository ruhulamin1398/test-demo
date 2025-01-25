import { useState } from "react";
import axios, { AxiosError, AxiosProgressEvent, AxiosResponse } from "axios";

// Define types for the response we expect from the server
type UploadResponse = {
  success: boolean;
  message?: string;
  data?: {
    path: string;
    mediaUrl: string;
  };
};

// Define the type for error response
interface ErrorResponse {
  message: string;
}

type UseFileUploadReturn = {
  uploadFile: (
    file: File,
    apiUrl: string,
    payload?: Record<string, unknown> // Accepts an optional payload parameter
  ) => Promise<UploadResponse>;
  isLoading: boolean;
  progress: number;
  error: string | null;
};

export const useFileUpload = (): UseFileUploadReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // Track the upload progress
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    apiUrl: string,
    payload?: Record<string, unknown> // New parameter for dynamic payload
  ): Promise<UploadResponse> => {
    setIsLoading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file); // Append the file

    // Dynamically append fields from the payload object to the FormData
    if (payload) {
      Object.keys(payload).forEach((key) => {
        const value = payload[key];
        if (value instanceof File) {
          // If the payload value is a file, append it as a file
          formData.append(key, value);
        } else {
          // Otherwise, append it as a regular form field
          formData.append(key, value as string);
        }
      });
    }

    try {
      const response: AxiosResponse<UploadResponse> = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Ensure cookies (including JWT) are sent along with the request
          onUploadProgress: (event: AxiosProgressEvent) => {
            if (event.total) {
              setProgress(Math.round((100 * event.loaded) / event.total)); // Calculate the progress percentage
            }
          },
        }
      );

      return response.data; // Return the response data if successful
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>; // Type assertion for AxiosError with ErrorResponse type
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "An error occurred"
      );
      return {
        success: false,
        message: axiosError.response?.data?.message || "Upload failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadFile,
    isLoading,
    progress,
    error,
  };
};
