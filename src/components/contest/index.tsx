import { Link, Card, Stack, Tooltip, Box, Button } from "@mui/material";
import { RouterLink } from "@/routes/components";
import { fCurrency } from "@/utils/format-number";
import { Label } from "@/components/label";
import { Image } from "@/components/image";
import { CompetitionStatusEnum, ICompetition } from "@/interfaces";

// ----------------------------------------------------------------------

type Props = {
  contest: Partial<ICompetition>;
  detailsHref: string;
};

const ContestItem = ({ contest, detailsHref }: Props) => {
  const { title, status, mediaUrl, price } = contest;
  const renderLabels = () => (
    <Box
      sx={{
        gap: 1,
        top: 16,
        zIndex: 9,
        right: 16,
        display: "flex",
        position: "absolute",
        alignItems: "center",
      }}
    >
      <Label variant="filled" color="info">
        {status}
      </Label>
    </Box>
  );

  const renderImage = () => (
    <Box sx={{ position: "relative", p: 1 }}>
      <Tooltip
        title={status === CompetitionStatusEnum.FINISHED && "Completed"}
        placement="bottom-end"
      >
        <Image
          alt={title}
          src={mediaUrl}
          ratio="16/9"
          sx={{
            borderRadius: 1.5,
            ...(status === CompetitionStatusEnum.FINISHED && {
              opacity: 0.48,
              filter: "grayscale(1)",
            }),
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = () => (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link
        component={RouterLink}
        href={detailsHref}
        color="inherit"
        variant="subtitle2"
        noWrap
      >
        {title}
      </Link>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Enrol Now
        </Button>

        <Box sx={{ gap: 0.5, display: "flex", typography: "subtitle1" }}>
          <Box component="span">{fCurrency(price)}</Box>
        </Box>
      </Box>
    </Stack>
  );

  return (
    <Card>
      {renderLabels()}
      {renderImage()}
      {renderContent()}
    </Card>
  );
};

export default ContestItem;
