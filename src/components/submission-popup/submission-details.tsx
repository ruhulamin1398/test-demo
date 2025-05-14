import { ISubmissionData } from "@/_mock/data";
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import { useDate } from "@/hooks/use-date";

type Props = BoxProps & {
  submission: ISubmissionData | null;
};

const SubmissionDetails = ({ submission, sx, ...other }: Props) => {
  const { formatDate } = useDate();
  console.log(submission);
  return (
    <>
      <Card>
        <CardHeader
          title={submission?.title}
          subheader={`Submitted At: ${formatDate(submission?.createdAt)}`}
        />
        <CardContent>
          <CardMedia
            component="img"
            height="140"
            image={submission?.submittedContent}
            alt="Submission File"
          />
          <Typography variant="body2" sx={{ opacity: 0.64, my: 1 }}>
            {submission?.description}
          </Typography>

          <Box
            sx={{
              pt: 3,
              display: "flex",
              position: "relative",
            }}
          >
            <Avatar
              alt={submission?.user?.name}
              src={submission?.user?.profilePicture}
              sx={{ mr: 2, width: 48, height: 48 }}
            />

            <Stack
              flexGrow={1}
              sx={[
                (theme) => ({
                  pb: 3,
                  borderBottom: `solid 1px ${theme.vars.palette.divider}`,
                }),
              ]}
            >
              <Typography variant="subtitle1" sx={{ opacity: 0.64 }}>
                Submitted By
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {submission?.user?.name}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default SubmissionDetails;
