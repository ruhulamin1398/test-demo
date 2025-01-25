import { RootState } from "@/app/store/store";
import { Card, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import { updateCompetition } from "@/app/store/slices/competitionSlice";

const AdminCompetitionThumbnail: React.FC = () => {
  const dispatch = useDispatch();
  const competition = useSelector(
    (state: RootState) => state.competition.competition
  );
  const onUploadSuccess = (mediaUrl: string) => {
    dispatch(updateCompetition({ mediaUrl }));
  };
  console.log(competition?.mediaUrl);
  return (
    <Card>
      <Typography>{competition?.mediaUrl}</Typography>
      <CardContent>
        <FileUpload
          onSuccess={onUploadSuccess}
          id={competition?.id || undefined}
          currentImage={competition?.mediaUrl}
        />
      </CardContent>
    </Card>
  );
};

export default AdminCompetitionThumbnail;
