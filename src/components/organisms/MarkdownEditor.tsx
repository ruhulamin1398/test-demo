import React, { useEffect, useRef } from "react";
import SimpleMDE from "react-simplemde-editor";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css"; // Import the EasyMDE CSS
import { Box, Button } from "@mui/material";
import useNotification from "@/app/hooks/useNotification";

export interface MarkdownEditorProps {
  initialValue: string;
  onSave: (markdown: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue,
  onSave,
}) => {
  const { notify } = useNotification();
  const editorRef = useRef<EasyMDE | null>(null);
  const initializeEditor = (instance: EasyMDE) => {
    editorRef.current = instance;
    if (initialValue) {
      instance.value(initialValue);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.value(initialValue);
    } else {
    }
  }, [initialValue]);

  const handleSave = () => {
    if (editorRef.current) {
      const currentValue = editorRef.current.value();
      onSave(currentValue);
    } else {
      notify({
        severity: "error",
        message: "Editor instance is null, cannot save.",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        py: 2,
        boxSizing: "border-box",
      }}
    >
      <SimpleMDE
        getMdeInstance={initializeEditor}
        options={{
          minHeight: "200px",
          spellChecker: false,
          status: false,
          placeholder: "Write your markdown here...",
        }}
      />
      <Box
        sx={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default MarkdownEditor;
