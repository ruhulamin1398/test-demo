import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import {
  Button,
  LinearProgress,
  linearProgressClasses,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { RouterLink } from "@/routes/components";
import { Iconify } from "@/components/iconify";
import { ICompetition } from "@/interfaces";
import SingleCompetitionCard from "../common/single-competition-card";
import EnrollmentConfirmationDialog from "@/components/confirmation-dialog";
import { useEnrollment } from "@/app/hooks/useEnrollment";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: ICompetition[];
};

const ProfilePageCompetition = ({
  title,
  subheader,
  list,
  sx,
  ...other
}: Props) => {
  const {
    openDialog,
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
    loading,
  } = useEnrollment();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          my: 0,
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
        {list.slice(0, 3).map((item) => (
          <SingleCompetitionCard
            key={item.id}
            item={item}
            handleEnrollment={handleOpenEnrollmentConfirmationDialog}
          />
        ))}
      </Box>

      <EnrollmentConfirmationDialog
        open={!!openDialog?.competitionId}
        onAgree={onAgreeEnrollment}
        onDisagree={handleCloseEnrollmentConfirmationDialog}
        createLoading={loading}
      />
    </>
  );
};

export default ProfilePageCompetition;
// ----------------------------------------------------------------------
