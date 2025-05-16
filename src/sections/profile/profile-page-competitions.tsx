import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import {
  Button,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { RouterLink } from "@/routes/components";
import { Iconify } from "@/components/iconify";
import { ICompetition } from "@/interfaces";
import SingleCompetitionCard from "../common/single-competition-card";
import EnrolmentConfirmationDialog from "@/components/confirmation-dialog";
import { useEnrollment } from "@/app/hooks/useEnrollment";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: ICompetition[];
};

export function ProfilePageCompetition({
  title,
  subheader,
  list,
  sx,
  ...other
}: Props) {
  const {
    openDialog,
    handleOpenEnrolmentConfirmationDialog,
    handleCloseEnrolmentConfirmationDialog,
    onAgreeEnrolment,
    loading,
  } = useEnrollment();

  return (
    <>
      <Card sx={sx} {...other}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            my: 2,
            px: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Typography variant="h5"> Active Contests</Typography>
          <Link
            component={RouterLink}
            href="/profile?profile-tab=my-competitions"
            color="inherit"
            underline="none"
          >
            <Button
              color="primary"
              variant="outlined"
              endIcon={<Iconify icon="ic:round-arrow-forward" />}
            >
              View All
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            p: 3,
            gap: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {list.slice(1, 4).map((item) => (
            <SingleCompetitionCard
              key={item.id}
              item={item}
              handleEnrolment={handleOpenEnrolmentConfirmationDialog}
            />
          ))}
        </Box>
      </Card>
      <EnrolmentConfirmationDialog
        open={!!openDialog?.competitionId}
        onAgree={onAgreeEnrolment}
        onDisagree={handleCloseEnrolmentConfirmationDialog}
        createLoading={loading}
      />
    </>
  );
}

// ----------------------------------------------------------------------
