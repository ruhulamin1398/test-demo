import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

// Define the ModalConfig Type with 'isOpen' included
export type ModalConfig = {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean; // Add isOpen here to indicate the modal's visibility
};

// Define the ModalContext Props
interface ModalContextProps {
  showModal: (config: ModalConfig) => void; // Full ModalConfig, including isOpen
  hideModal: () => void;
}

// Create the ModalContext
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Custom hook to use the modal context
export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// Modal Provider to wrap around your app and provide modal state
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  // Function to show modal
  const showModal = useCallback((config: ModalConfig) => {
    setModalConfig(config); // Now this will accept full config, including isOpen
  }, []);

  // Function to hide modal
  const hideModal = useCallback(() => {
    setModalConfig(null);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalConfig && modalConfig.isOpen && (
        <Dialog open={true} onClose={hideModal}>
          <DialogTitle>{modalConfig.title}</DialogTitle>
          <DialogContent>{modalConfig.content}</DialogContent>
          <DialogActions>
            <Button onClick={modalConfig.onCancel}>
              {modalConfig.cancelText || "Cancel"}
            </Button>
            <Button
              onClick={() => {
                modalConfig.onConfirm();
                hideModal();
              }}
              color="primary"
            >
              {modalConfig.confirmText || "Confirm"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ModalContext.Provider>
  );
};

// Modal helper methods to be used globally (like `Modal.confirm()`)
// This function is now a *regular* function, not calling hooks, and will rely on context from the component
// export const Modal = {
//   confirm: (config: Omit<ModalConfig, "isOpen">) => {
//     const context = useModal(); // Use the context within a function component, not a regular function
//     context.showModal({
//       ...config,
//       isOpen: true, // Set 'isOpen' to true to make the modal visible
//     });
//   },
//   info: (config: Omit<ModalConfig, "isOpen">) => {
//     const context = useModal(); // Use the context within a function component, not a regular function
//     context.showModal({
//       ...config,
//       isOpen: true, // Set 'isOpen' to true for other types
//     });
//   },
//   // Add other modal types here (e.g., success, error)
// };
