import { gql } from "@apollo/client";
export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!, $id: String!) {
    uploadCompetitionThubmnail(file: $file, id: $id) {
      id
      mediaUrl
    }
  }
`;
