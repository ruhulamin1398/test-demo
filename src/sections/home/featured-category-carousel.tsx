import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import {
  Carousel,
  useCarousel,
  CarouselArrowFloatButtons,
} from "@/components/carousel";
import { CompetitionItemSkeleton } from "@/app/competition/components/CompetitionItemSkeleton";

import { Card, CardProps, Link, Typography } from "@mui/material";
import { SvgColor } from "@/components/svg-color";
import { ICategory } from "@/interfaces/category";
import { PaletteColorKey } from "@/theme";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  list: ICategory[];
};

const HomeFeaturedCategoryCarousel = ({
  loading,
  list,
  sx,
  ...other
}: Props) => {
  const carousel = useCarousel({
    loop: true,
    align: "start",
    slideSpacing: "24px",
    slidesToShow: {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 4,
      xl: 4,
    },
  });
  const renderLoading = () => (
    <Box
      sx={[
        () => ({
          gap: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <CompetitionItemSkeleton itemCount={4} />
    </Box>
  );
  const renderList = () => {
    const paletteKeys = [
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
    ] as const;

    type PaletteKey = (typeof paletteKeys)[number];

    // Randomly select one
    const color: PaletteKey =
      paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
    return (
      <>
        <Carousel
          carousel={carousel}
          slotProps={{ slide: { py: 3 } }}
          sx={{ px: 0.5 }}
        >
          {list.map((item, id) => {
            const color: PaletteKey = paletteKeys[id % paletteKeys.length];
            console.log(" paletteKeys.length", paletteKeys.length);
            return <Item key={item.id} item={item} color={color} />;
          })}
        </Carousel>
        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
        />
      </>
    );
  };
  return (
    <Box sx={{ mb: 3, paddingX: 3, position: "relative" }} {...other}>
      {loading ? renderLoading() : renderList()}
    </Box>
  );
};

type ItemProps = CardProps & {
  item: ICategory;
  color: PaletteColorKey;
};

const Item = ({ item, color, sx, ...other }: ItemProps) => {
  return (
    <>
      <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        <Box sx={{ px: 2, py: 2.5 }}>
          <Link
            variant="subtitle2"
            color="inherit"
            underline="none"
            href={`/competition`}
            sx={(theme) => ({
              ...theme.mixins.maxLine({
                line: 2,
                persistent: theme.typography.subtitle2,
              }),
              display: "flex", // Make Link a flex container
              alignItems: "center", // Vertically center its children
              height: "100%", // Take full height of parent
            })}
          >
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {item.name}
            </Typography>
          </Link>

          <SvgColor
            src=""
            sx={(theme) => ({
              top: 24,
              right: 20,
              width: 36,
              height: 36,
              position: "absolute",
              background: `linear-gradient(135deg, ${theme.vars.palette[color].main} 0%, ${theme.vars.palette[color].dark} 100%)`,
            })}
          />

          <Box
            sx={(theme) => ({
              top: -44,
              width: 160,
              zIndex: -1,
              height: 160,
              right: -104,
              opacity: 0.12,
              borderRadius: 3,
              position: "absolute",
              transform: "rotate(40deg)",
              background: `linear-gradient(to right, ${theme.vars.palette[color].main}, transparent)`,
            })}
          />
        </Box>
      </Card>
    </>
  );
};
export default HomeFeaturedCategoryCarousel;
// ----------------------------------------------------------------------
