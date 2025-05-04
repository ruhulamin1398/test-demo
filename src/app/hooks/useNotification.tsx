import { useCallback } from "react";
import { toast, ToastOptions } from "react-toastify";
import { Alert } from "@mui/material";
// import "react-toastify/dist/ReactToastify.css";

interface NotifyProps {
  severity: "success" | "error" | "info" | "warning";
  message: string | React.ReactElement;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center";
  autoClose?: number;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  closeButton?: boolean; // Hides the default close button of react-toastify
}

const useNotification = () => {
  const notify = useCallback(
    ({
      severity,
      message,
      position = "top-right",
      autoClose = 3000,
      closeOnClick = true,
      pauseOnHover = true,
      draggable = true,
      closeButton = false, // Hides the default close button of react-toastify
    }: NotifyProps) => {
      // Wrap the Alert inside a Fragment to prevent invalid props from being passed to the DOM
      // Wrapping the Alert inside a function component to filter out invalid props
      const ToastContent = ({
        message,
        severity,
      }: Pick<NotifyProps, "message" | "severity">) => (
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      );

      // Pass the valid props only
      toast(<ToastContent message={message} severity={severity} />, {
        position,
        autoClose,
        closeOnClick,
        pauseOnHover,
        draggable,
        closeButton,
        style: {
          backgroundColor: "transparent",
          boxShadow: "none", // Optional: to remove shadow
          color: "inherit", // Optional: to inherit text color from parent
        },
      } as ToastOptions);
    },
    []
  );

  return { notify };
};

export default useNotification;
