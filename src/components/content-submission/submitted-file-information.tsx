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
import { IEnrolmentSubmission } from "@/interfaces/enrolmentSubmission";
import { useDate } from "@/hooks/use-date";
type Props = {
  submission: IEnrolmentSubmission | null;
};

const SubmittedFileInformation = ({ submission }: Props) => {
  const { formatDate } = useDate();
  return (
    <>
      <Card sx={{ my: 2 }}>
        <CardHeader
          title={"You have alerady Submitted at this round "}
          subheader={`Submitted At: ${formatDate(submission?.createdAt)}`}
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
