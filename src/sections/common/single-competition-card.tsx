import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card, { CardProps } from "@mui/material/Card";
import Button from "@mui/material/Button";

import { fShortenNumber } from "@/utils/format-number";

import { Image } from "@/components/image";
import { Iconify } from "@/components/iconify";
import { Label, labelClasses } from "@/components/label";

import { RouterLink } from "@/routes/components";
import { IconButton } from "@mui/material";
import { ICompetition } from "@/interfaces";
import { useDate } from "@/hooks/use-date";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type CardItemProps = CardProps & {
  item: ICompetition;
  handleEnrolment: (competitionId: string) => void;
  isEnrolled?: boolean;
};

const SingleCompetitionCard = ({
  isEnrolled = false,
  item,
  handleEnrolment,
  sx,
  ...other
}: CardItemProps) {
  let nextDeadlineTime = 0;
 
  const { HumanTimeDifferent } = useDate();

  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image
        alt={item.title}
        src={item.mediaUrl}
        ratio="5/4"
        sx={{ borderRadius: 1.5 }}
      />
    </Box>
  );

  const renderLabels = () => (
    <Box
      sx={{
        gap: 1,
        mb: 1.5,
        display: "flex",
        flexWrap: "wrap",
        [`& .${labelClasses.root}`]: {
          typography: "caption",
          color: "text.secondary",
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {!isEnrolled && (
          <Label
            startIcon={<Iconify width={12} icon="solar:clock-circle-outline" />}
          >
            {HumanTimeDifferent(Number(item.enrolmentDeadline.endDate))}
          </Label>
        )}

        <Label
          sx={{ ml: 1 }}
          startIcon={
            <Iconify width={12} icon="solar:users-group-rounded-bold" />
          }
        >
          {fShortenNumber(item?.enroledUserCount)}
        </Label>
      </Box>

      <IconButton>
        <Iconify width={12} icon="solar:share-bold" />
      </IconButton>
    </Box>
  );

  const renderFooter = () => (
    <Box
      sx={{
        mt: 2.5,
        gap: 0.5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="span"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center", // Align icon and text inline
          gap: 1, // Space between the icon and text
          typography: "subtitle1",
        }}
      >
        <Iconify
          icon="mdi:trophy-outline" // Trophy icon
          width={16}
          sx={{ color: "#FFD700" }} // Golden color
        />
        ${10000}
      </Box>

      <Link
        component={RouterLink}
        href={paths.competition.details(item.id)}
        color="inherit"
        underline="none"
      >
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            handleEnrolment(item.id);
          }}
          disabled={isEnrolled}
        >
          {isEnrolled ? "Enrolled" : "Join"}
        </Button>
      </Link>
    </Box>
  );

  return (
    <>
      <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        {renderImage()}

        <Box sx={{ px: 2, py: 2.5 }}>
          {renderLabels()}

          <Link
            variant="subtitle2"
            color="inherit"
            underline="none"
            href={`/competition/${item.id}`}
            sx={(theme) => ({
              ...theme.mixins.maxLine({
                line: 2,
                persistent: theme.typography.subtitle2,
              }),
            })}
          >
            {item.title}
          </Link>

          {renderFooter()}
        </Box>
      </Card>
    </>
  );
};

export default SingleCompetitionCard;
