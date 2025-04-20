import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
  Carousel,
  useCarousel,
  CarouselArrowFloatButtons,
} from "@/components/carousel";

import {
  Button,
  Card,
  Divider,
  fabClasses,
  Stack,
  Tooltip,
} from "@mui/material";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@/components/image";
import { IContestItem } from "@/types/contest";

import { Label } from "@/components/label";
import { RouterLink } from "@/routes/components";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

type Props = {
  data: IContestItem[];
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
      <Tooltip title={!status && "Out of stock"} placement="bottom-end">
        <Image
          alt={title}
          src={image}
          ratio="1/1"
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
      <Box
        sx={{
          gap: 0.5,
          display: "flex",
          alignItems: "center",
          color: "primary.main",
          typography: "caption",
        }}
      >
        <Iconify width={16} icon="solar:users-group-rounded-bold" />
        12 Submissions
      </Box>

      <Box
        sx={{
          p: 0,
          rowGap: 1.5,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {[
          {
            label: "Open for everyone",
            icon: (
              <Iconify
                width={16}
                icon="carbon:skill-level-basic"
                sx={{ flexShrink: 0 }}
              />
            ),
          },
          {
            label: "Ends in 2 days",
            icon: (
              <Iconify
                width={16}
                icon="solar:clock-circle-bold"
                sx={{ flexShrink: 0 }}
              />
            ),
          },
          // {
          //   label: "salary",
          //   icon: (
          //     <Iconify
          //       width={16}
          //       icon="solar:wad-of-money-bold"
          //       sx={{ flexShrink: 0 }}
          //     />
          //   ),
          // },
          // {
          //   label: "role",
          //   icon: (
          //     <Iconify
          //       width={16}
          //       icon="solar:user-rounded-bold"
          //       sx={{ flexShrink: 0 }}
          //     />
          //   ),
          // },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              gap: 0.5,
              minWidth: 0,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            {item.icon}
            <Typography variant="caption" noWrap>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
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

        <Button color="primary" variant="contained">
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
