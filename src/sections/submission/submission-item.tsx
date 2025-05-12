import type { CardProps } from "@mui/material/Card";

import Box, { BoxProps } from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { RouterLink } from "@/routes/components";
import { AvatarShape } from "@/assets/illustrations";
import { Image } from "@/components/image";
import { Iconify } from "@/components/iconify";
import { ISubmissions } from "@/_mock/data";
import { Button } from "@mui/material";
import { Label } from "@/components/label";
import { fShortenNumber } from "@/utils/format-number";

// ----------------------------------------------------------------------

type PostItemProps = CardProps & {
  item: ISubmissions;
};

export function SubmissionItem({ item, sx, ...other }: PostItemProps) {
  const renderFooter = () => (
    <Box
      sx={{
        mt: 2.5,
        gap: 0.5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* <Box
        component="span"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center", // Align icon and text inline
          gap: 1, // Space between the icon and text
          typography: "subtitle1",
        }}
      >
        <Iconify icon="mdi:heart" width={20} style={{ color: "red" }} />
        {item.vote}
      </Box> */}

      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Vote
      </Button>
    </Box>
  );

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
        {item.category?.name}
      </Label>
    </Box>
  );
  const renderHeader = () => (
    <Box sx={{ position: "relative" }}>
      <AvatarShape
        sx={{
          left: 0,
          zIndex: 9,
          width: 88,
          height: 36,
          bottom: -16,
          position: "absolute",
        }}
      />
      <Avatar
        alt={item?.user?.id}
        src={item?.user?.profilePicture}
        sx={{
          left: 24,
          zIndex: 9,
          bottom: -24,
          position: "absolute",
        }}
      />

      <Image alt={item.title} src={item.submittedContent} ratio="4/3" />
    </Box>
  );
  const renderInfoBlock = () => (
    <Box
      sx={[
        () => ({
          mt: 2,
          mx: 2,
          gap: 1.5,
          display: "flex",
          typography: "caption",
          color: "text.disabled",
          justifyContent: "flex-end",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
        <Iconify width={16} icon="mdi:heart" style={{ color: "red" }} />
        {fShortenNumber(item.vote)}
      </Box>

      <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
        <Iconify width={16} icon="solar:share-bold" color="primary" />
      </Box>
    </Box>
  );
  const renderContent = () => (
    <CardContent sx={{ pt: 2 }}>
      <Typography variant="caption" sx={{ color: "#FFD700" }}>
        {item.competition?.title}
      </Typography>
      <Link
        component={RouterLink}
        href={item.id}
        color="inherit"
        variant="subtitle2"
        sx={(theme) => ({
          ...theme.mixins.maxLine({
            line: 2,
            persistent: theme.typography.subtitle2,
          }),
        })}
      >
        {item.title}
      </Link>
      <Typography
        variant="caption"
        component="div"
        sx={(theme) => ({
          ...theme.mixins.maxLine({
            line: 1,
            persistent: theme.typography.body2,
          }),
          color: "text.disabled",
        })}
      >
        {item.description}
      </Typography>

      {renderFooter()}
    </CardContent>
  );

  return (
    <Card sx={sx} {...other}>
      {renderHeader()}

      {renderLabels()}
      {renderInfoBlock()}

      {renderContent()}
    </Card>
  );
}

// ----------------------------------------------------------------------
