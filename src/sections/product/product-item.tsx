import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { fabClasses } from "@mui/material/Fab";

import { RouterLink } from "@/routes/components";

import { fCurrency } from "@/utils/format-number";

import { Label } from "@/components/label";
import { Image } from "@/components/image";
import { IProductItem } from "@/types/product";
import Button from "@/components/atoms/Button";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  detailsHref: string;
};

export function ProductItem({ product, detailsHref }: Props) {
  const { name, coverUrl, price, available, newLabel, saleLabel } = product;

  const renderLabels = () =>
    (newLabel.enabled || saleLabel.enabled) && (
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
        {newLabel.enabled && (
          <Label variant="filled" color="info">
            {"Upcoming"}
          </Label>
        )}
        {saleLabel.enabled && (
          <Label variant="filled" color="error">
            {"Ongoing"}
          </Label>
        )}
      </Box>
    );

  const renderImage = () => (
    <Box sx={{ position: "relative", p: 1 }}>
      <Image
        alt={name}
        src={coverUrl}
        ratio="1/1"
        sx={{
          borderRadius: 1.5,
          ...(!available && { opacity: 0.48, filter: "grayscale(1)" }),
          transition: "all 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
      />
    </Box>
  );

  const renderContent = () => (
    <Stack spacing={2.5} sx={{ p: 1, pt: 2 }}>
      <Link
        component={RouterLink}
        href={detailsHref}
        color="inherit"
        variant="subtitle2"
        noWrap
      >
        {name}
      </Link>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {"This is demo description"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            gap: 0.5,
            display: "flex",
            typography: "subtitle1",

            fontWeight: "bold",
          }}
        >
          <Box component="span" sx={{ color: "#4F46E5" }}>
            {fCurrency(price)} Prize
          </Box>
        </Box>
        <Box sx={{ gap: 0.5, display: "flex", typography: "subtitle1" }}>
          <Button
            text="Join Now"
            sx={{
              backgroundColor: "#4F46E5",
              color: "#ffffff",
              borderRadius: 10,
            }}
          ></Button>
        </Box>
      </Box>
    </Stack>
  );

  return (
    <Card
      sx={{
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
