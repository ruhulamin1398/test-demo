import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { fCurrency, fShortenNumber } from "@/utils/format-number";

import { Image } from "@/components/image";
import { Iconify } from "@/components/iconify";
import { Label, labelClasses } from "@/components/label";
import {
  Carousel,
  useCarousel,
  CarouselArrowFloatButtons,
} from "@/components/carousel";
import { IContestItem } from "@/types/contest";
import { RouterLink } from "@/routes/components";
import Autoplay from "embla-carousel-autoplay";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title: string;
  list: IContestItem[];
};

export function HomeFeaturedContestCarousel({
  title,
  list,
  sx,
  ...other
}: Props) {
  const carousel = useCarousel(
    {
      loop: true,
      align: "start",
      slideSpacing: "24px",
      slidesToShow: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
      },
    },
    [Autoplay({ playOnInit: true })]
  );

  return (
    <Box sx={{ mb: 3, paddingX: 3, position: "relative" }} {...other}>
      {/* <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <CarouselArrowBasicButtons {...carousel.arrows} />
      </Box> */}

      <Carousel
        carousel={carousel}
        slotProps={{ slide: { py: 3 } }}
        sx={{ px: 0.5 }}
      >
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
      <CarouselArrowFloatButtons
        {...carousel.arrows}
        options={carousel.options}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = CardProps & {
  item: Props["list"][number];
};

function CarouselItem({ item, sx, ...other }: CarouselItemProps) {
  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image
        alt={item.title}
        src={item.image}
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
      <Label
        startIcon={<Iconify width={12} icon="solar:clock-circle-outline" />}
      >
        1h 40m
      </Label>

      <Label
        startIcon={<Iconify width={12} icon="solar:users-group-rounded-bold" />}
      >
        {fShortenNumber(item.totalEnroll)}
      </Label>
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
      <Box component="span" sx={{ typography: "h6" }}>
        {item.prize}
      </Box>

      <Box
        component="span"
        sx={{ typography: "body2", color: "text.secondary", flexGrow: 1 }}
      >
        / year
      </Box>

      <Link
        component={RouterLink}
        href={item.detailsHref}
        color="inherit"
        underline="none"
      >
        <Button color="primary" variant="contained" size="small">
          Join
        </Button>
      </Link>
    </Box>
  );

  return (
    <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      {renderImage()}

      <Box sx={{ px: 2, py: 2.5 }}>
        {renderLabels()}

        <Link
          variant="subtitle2"
          color="inherit"
          underline="none"
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
  );
}
