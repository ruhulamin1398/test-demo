import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Stack,
  Typography,
} from "@mui/material";

import { useDate } from "@/hooks/use-date";
import { IRound } from "@/interfaces";
import ShowMoreLessText from "../show-more-less-text";
import RoundDateTimeLine from "../round-date-timeline";
import { ReactNode } from "react";

import { varAlpha } from "minimal-shared/utils";
import { Iconify } from "../iconify";
import { SubmissionTypeIconLabel } from "@/utils/constants";

type Props = BoxProps & {
  round: IRound | null;
};

const RoundDetails = ({ round, sx, ...other }: Props) => {
  const { formatDate } = useDate();
  console.log(round);
  return (
    <>
      <CardHeader
        title={round?.title}
        subheader={` ${formatDate(round?.deadline?.startDate)} - ${formatDate(
          round?.deadline?.endDate
        )}`}
        sx={{
          textAlign: "center",
          pb: 2,
          borderBottom: (theme) => `solid 1px ${theme.vars.palette.divider}`,
        }}
      />
      <CardContent>
        <Item
          index={1}
          title="Overview"
          text={<ShowMoreLessText text={round?.description} maxLength={100} />}
        />
        <Item
          index={2}
          title="Submission Type"
          icon={SubmissionTypeIconLabel[round?.submissionType ?? "Photo"].icon}
          text={SubmissionTypeIconLabel[round?.submissionType ?? "Photo"].label}
        />
        <Item
          index={3}
          title="Judgement Type"
          icon="solar:users-group-rounded-bold"
          text={round?.judgementCriteria}
        />

        <RoundDateTimeLine round={round} title="Round Timeline" />
      </CardContent>
    </>
  );
};
export default RoundDetails;

type ItmProps = CardProps & {
  title?: string;
  text?: string | ReactNode;
  index: number;
  icon?: string;
};
const Item = ({ title, text, index, icon, sx, ...other }: ItmProps) => {
  return (
    <Box
      sx={[
        { gap: 2, display: "flex", alignItems: "center", mb: 3 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {icon && (
        <Box
          sx={[
            (theme) => ({
              width: 40,
              height: 40,
              display: "flex",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.main",
              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
              ...(index === 1 && {
                color: "info.main",
                bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.08),
              }),
              ...(index === 2 && {
                color: "error.main",
                bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
              }),
            }),
          ]}
        >
          <Iconify width={24} icon={icon} />
        </Box>
      )}
      <Box flexGrow={1}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};
// const Item = ({ title, text }: ItmProps) => {
//   return (
//     <Box
//       sx={{
//         mb: 2,
//         gap: 0.5,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "left",
//       }}
//     >
//       <Box component="span">
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           {title}
//         </Typography>
//       </Box>
//       <Box>
//         <Typography variant="body2">{text}</Typography>
//       </Box>
//     </Box>
//   );
// };
