import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { IEnrollmentSubmission } from "@/interfaces/enrollmentSubmission";
import { useDate } from "@/hooks/use-date";
type Props = {
  submission: IEnrollmentSubmission | null;
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
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1">{submission?.title} </Typography>
            <Typography variant="body2">{submission?.description} </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SubmittedFileInformation;
