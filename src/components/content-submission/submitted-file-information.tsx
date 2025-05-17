import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
} from "@mui/material";
import { IEnrollmentSubmission } from "@/interfaces/enrollmentSubmission";
type Props = {
  submission: IEnrollmentSubmission | null;
};

const SubmittedFileInformation = ({ submission }: Props) => {
  return (
    <>
      <Card>
        <CardHeader
          title={"You have alerady Submitted at this round "}
          subheader={`Submitted At: ${submission?.createdAt}`}
        />
        <CardContent>
          <CardMedia
            component="img"
            height="140"
            image={submission?.submittedContent}
            alt="Submission File"
          />
          <Box></Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SubmittedFileInformation;
