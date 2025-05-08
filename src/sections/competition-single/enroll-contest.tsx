import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { Beenhere } from "@mui/icons-material";
import { Iconify } from "@/components/iconify";
import { Label, labelClasses } from "@/components/label";
import EnrolmentConfirmationDialog from "@/components/confirmation-dialog";
import { useEnrollment } from "@/app/hooks/useEnrollment";
import { useDate } from "@/hooks/use-date";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  competitionId: string;
  title?: string;
  price?: string;
  description?: string;
  deadlineEndDate: Date;
};

export function EnrolmentCard({
  competitionId,
  price,
  title,
  description,
  deadlineEndDate,
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
  const { HumanTimeDifferent } = useDate();
  return (
    <>
      <Box
        sx={[
          (theme) => ({
            p: 5,
            borderRadius: 2,
            position: "relative",
            color: "common.white",
            backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark})`,
            width: "100%",
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box sx={{ whiteSpace: "pre-line", typography: "h6" }}>{title}</Box>
        <Box sx={{ typography: "body2" }}>
          {description
            ? description.split(" ").slice(0, 20).join(" ") +
              (description.split(" ").length > 20 ? "..." : "")
            : ""}
        </Box>

        <Box sx={{ typography: "h2" }}>{price}</Box>
        <Box
          sx={{
            gap: 1,
            my: 2,
            display: "flex",
            flexWrap: "wrap",
            [`& .${labelClasses.root}`]: {
              typography: "body2",
              color: "common.white",
              bgcolor: "primary.main",
            },
          }}
        >
          <Label
            startIcon={<Iconify width={12} icon="solar:clock-circle-outline" />}
          >
            {HumanTimeDifferent(Number(deadlineEndDate))}
          </Label>

          <Label
            startIcon={
              <Iconify width={12} icon="solar:users-group-rounded-bold" />
            }
          >
            500
          </Label>
        </Box>

        <Button
          fullWidth
          size="large"
          startIcon={<Beenhere />}
          color="primary"
          variant="contained"
          onClick={() => {
            handleOpenEnrolmentConfirmationDialog(competitionId);
          }}
        >
          ENROLL NOW
        </Button>
      </Box>
      <EnrolmentConfirmationDialog
        open={!!openDialog?.competitionId}
        onAgree={onAgreeEnrolment}
        onDisagree={handleCloseEnrolmentConfirmationDialog}
        createLoading={loading}
      />
    </>
  );
}
