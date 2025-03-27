import { RootState } from "@/store/store";
import { Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import { updateCompetition } from "@/store/slices/competitionSlice";

const AdminCompetitionThumbnail: React.FC = () => {
  const dispatch = useDispatch();
  const competition = useSelector(
    (state: RootState) => state.competition.competition
  );
  const onUploadSuccess = (mediaUrl: string) => {
    dispatch(updateCompetition({ mediaUrl }));
  };

  return (
    <Card>
      <CardContent>
        <FileUpload
          onSuccess={onUploadSuccess}
          currentImage={competition?.mediaUrl}
          id={competition?.id || undefined}
        />
      </CardContent>
    </Card>
  );
};

export default AdminCompetitionThumbnail;
