import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import { RouterLink } from "@/routes/components";

import { fDate } from "@/utils/format-time";
import { fShortenNumber } from "@/utils/format-number";

import { AvatarShape } from "@/assets/illustrations";

import { Image } from "@/components/image";
import { Iconify } from "@/components/iconify";
import { ISubmissionItem } from "@/types/submission";

// ----------------------------------------------------------------------

type PostItemProps = CardProps & {
  item: ISubmissionItem;
  detailsHref: string;
};

export function SubmissionItem({
  item,
  detailsHref,
  sx,
  ...other
}: PostItemProps) {
  return (
    <Card sx={sx} {...other}>
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
          alt={item.author}
          src={item.author.avatarUrl}
          sx={{
            left: 24,
            zIndex: 9,
            bottom: -24,
            position: "absolute",
          }}
        />

        <Image alt={item.title} src={item.image} ratio="4/3" />
      </Box>

      <CardContent sx={{ pt: 6 }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ mb: 1, color: "text.disabled" }}
        >
          {fDate(item.createdAt)}
        </Typography>

        <Link
          component={RouterLink}
          href={detailsHref}
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

        <InfoBlock
          totalViews={item.totalViews}
          totalShares={item.totalShares}
          totalComments={item.totalComments}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostItemLatestProps = {
  item: ISubmissionItem;
  index: number;
  detailsHref: string;
};

export function PostItemLatest({
  item,
  index,
  detailsHref,
}: PostItemLatestProps) {
  const itemSmall = index === 1 || index === 2;

  return (
    <Card>
      <Avatar
        alt={item.author}
        src={item.author.avatarUrl}
        sx={{
          top: 24,
          left: 24,
          zIndex: 9,
          position: "absolute",
        }}
      />

      <Image
        alt={item.title}
        src={item.coverUrl}
        ratio="4/3"
        sx={{ height: 360 }}
        slotProps={{
          overlay: {
            sx: (theme) => ({
              bgcolor: varAlpha(theme.vars.palette.grey["900Channel"], 0.64),
            }),
          },
        }}
      />

      <CardContent
        sx={{
          width: 1,
          zIndex: 9,
          bottom: 0,
          position: "absolute",
          color: "common.white",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ mb: 1, opacity: 0.64 }}
        >
          {fDate(item.createdAt)}
        </Typography>

        <Link
          component={RouterLink}
          href={detailsHref}
          color="inherit"
          variant={postSmall ? "subtitle2" : "h5"}
          sx={(theme) => ({
            ...theme.mixins.maxLine({
              line: 2,
              persistent: postSmall
                ? theme.typography.subtitle2
                : theme.typography.h5,
            }),
          })}
        >
          {item.title}
        </Link>

        <InfoBlock
          totalViews={item.totalViews}
          totalShares={item.totalShares}
          totalComments={item.totalComments}
          sx={{ opacity: 0.64, color: "common.white" }}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

type InfoBlockProps = BoxProps &
  Pick<ISubmissionItem, "totalViews" | "totalShares" | "totalComments">;

function InfoBlock({
  sx,
  totalViews,
  totalShares,
  totalComments,
  ...other
}: InfoBlockProps) {
  return (
    <Box
      sx={[
        () => ({
          mt: 3,
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
        <Iconify width={16} icon="eva:message-circle-fill" />
        {fShortenNumber(totalComments)}
      </Box>

      <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
        <Iconify width={16} icon="solar:eye-bold" />
        {fShortenNumber(totalViews)}
      </Box>

      <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
        <Iconify width={16} icon="solar:share-bold" />
        {fShortenNumber(totalShares)}
      </Box>
    </Box>
  );
}
