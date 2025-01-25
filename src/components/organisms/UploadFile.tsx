import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "@/graphql-client/upload";

const FileUpload = ({ id }: { id?: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFile, { loading, error, data }] = useMutation(UPLOAD_FILE);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (selectedFile && id) {
      console.log(selectedFile, "selectedFile");
      try {
        await uploadFile({
          variables: { file: selectedFile, id },
        });
      } catch (err) {
        console.error("File upload error:", err);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={loading || !id}>
        {loading ? "Uploading..." : "Upload File"}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>File uploaded successfully!</p>}
    </div>
  );
};

export default FileUpload;
