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
import { IRound } from "@/interfaces";

type Props = BoxProps & {
  round: IRound | null;
};

const RoundDetails = ({ round, sx, ...other }: Props) => {
  const { formatDate } = useDate();
  console.log(round);
  return (
    <>
      <Card>
        <CardHeader
          title={round?.title}
          subheader={` ${formatDate(round?.startDate)} - ${formatDate(
            round?.endDate
          )}`}
        />
        <CardContent>
          <Typography variant="body2" sx={{ opacity: 0.64, my: 1 }}>
            {round?.description}
          </Typography>

          <Box
            sx={{
              pt: 3,
              display: "flex",
              position: "relative",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Item
              title="Submission Open"
              text={` ${formatDate(round?.submissionStartDate)} - ${formatDate(
                round?.submissionEndDate
              )}`}
            />
            <Item title="Submission Type" text={round?.submissionType} />
            <Item title="Judgement Type" text={round?.judgementCriteria} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default RoundDetails;

type ItmProps = {
  title?: string;
  text?: string;
};
const Item = ({ title, text }: ItmProps) => {
  return (
    <Stack
      flexGrow={1}
      sx={[
        (theme) => ({
          pb: 2,
          borderBottom: `solid 1px ${theme.vars.palette.divider}`,
        }),
      ]}
    >
      <Typography variant="subtitle1" sx={{ opacity: 0.64 }}>
        {title}
      </Typography>
      <Typography variant="subtitle2">{text}</Typography>
    </Stack>
  );
};
