import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import {
  Carousel,
  useCarousel,
  CarouselArrowFloatButtons,
} from "@/components/carousel";

import { Card } from "@mui/material";
import Autoplay from "embla-carousel-autoplay";

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: number;
    title: string;
    icon: React.JSX.Element;
    description: string;
    count: string;
  }[];
};

export function ContestCategoryCarousel({ data }: Props) {
  const carousel = useCarousel(
    {
      loop: true,
      dragFree: true,
      slideSpacing: "20px",
      slidesToShow: { xs: 1, sm: 2, md: "36%" },
    },
    [Autoplay({ playOnInit: true })]
  );

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Carousel carousel={carousel}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
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

type CarouselItemProps = {
  index: number;
  item: Props["data"][number];
};

function CarouselItem({ item, index }: CarouselItemProps) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box key={item.id} px={2}>
        <Card
          sx={{
            textAlign: "center",
            p: 4,
            borderRadius: 3,
            boxShadow: 5,
            marginBottom: 2,
          }}
        >
          <Box display="flex" justifyContent="center" pb={2}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 10,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              {item.icon}
            </Box>
          </Box>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography color="textSecondary" pb={1}>
              {item.description}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {item.count}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
