import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
  Carousel,
  useCarousel,
  CarouselArrowFloatButtons,
} from "@/components/carousel";

import { Button, Card, Fab, fabClasses, Stack, Tooltip } from "@mui/material";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@/components/image";
import { IContestItem } from "@/types/contest";

import { Label } from "@/components/label";
import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: number;
    title: string;
    description: string;
    prize: string;
    status: string;
    image: string;
  }[];
};

export function FeaturedContestCarousel({ data }: Props) {
  const carousel = useCarousel(
    {
      loop: true,
      dragFree: true,
      slideSpacing: "00px",
      slidesToShow: { xs: 1, sm: 2, md: "36%" },
    },
    [Autoplay({ playOnInit: true })]
  );

  return (
    <>
      <Box sx={{ position: "relative", paddingX: 3 }}>
        <Carousel carousel={carousel}>
          {data.map((item, index) => (
            <ContestItem key={item.id} contest={item} />
          ))}
        </Carousel>

        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
        />
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
type ItemProps = {
  contest: IContestItem;
};

export function ContestItem({ contest }: ItemProps) {
  const { title, description, prize, status, image, detailsHref } = contest;

  const renderLabels = () => (
    <Box
      sx={{
        gap: 1,
        top: 16,
        zIndex: 9,
        right: 40,
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
      {!!status && (
        <Fab
          size="medium"
          color="warning"
          onClick={() => {}}
          sx={[
            (theme) => ({
              right: 16,
              zIndex: 9,
              bottom: 16,
              opacity: 0,
              position: "absolute",
              transform: "scale(0)",
              transition: theme.transitions.create(["opacity", "transform"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
            }),
          ]}
        ></Fab>
      )}

      <Tooltip title={!status && "Out of stock"} placement="bottom-end">
        <Image
          alt={title}
          src={image}
          ratio="16/9"
          sx={{
            borderRadius: 1.5,
            ...(!status && { opacity: 0.48, filter: "grayscale(1)" }),
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = () => (
    <Stack spacing={1.2} sx={{ p: 3, pt: 2 }}>
      <Link
        component={RouterLink}
        href={detailsHref}
        color="inherit"
        variant="subtitle2"
        noWrap
      >
        {title}
      </Link>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ gap: 0.5, display: "flex", typography: "subtitle1" }}>
          <Box component="span">{prize} </Box>
        </Box>

        <Button color="secondary" variant="contained">
          <Link
            component={RouterLink}
            href={detailsHref}
            color="inherit"
            variant="subtitle2"
            noWrap
          >
            Join Now
          </Link>
        </Button>
      </Box>
    </Stack>
  );

  return (
    <Card
      sx={{
        paddingX: 1,
        marginX: 4,
        "&:hover": {
          [`& .${fabClasses.root}`]: { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      {renderLabels()}
      {renderImage()}
      {renderContent()}
    </Card>
  );
}
