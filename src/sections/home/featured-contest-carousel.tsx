import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import {
  Carousel,
  useCarousel,
  CarouselArrowFloatButtons,
} from "@/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SingleCompetitionCard } from "../common/single-competition-card";
import { ICompetition } from "@/interfaces";
import { useCompetitionHandleEnrollmentDialog } from "@/hooks/competitionHandleErollmentDialogHook";
import EnrollmentConfirmationDialog from "@/components/confirmation-dialog";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title: string;
  list: ICompetition[];
};

export function HomeFeaturedContestCarousel({
  title,
  list,
  sx,
  ...other
}: Props) {
  const {
    openDialog,
    handleOpenEnrollmentConfirmationDialog,
    handleCloseEnrollmentConfirmationDialog,
    onAgreeEnrollment,
  } = useCompetitionHandleEnrollmentDialog();

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
      <Carousel
        carousel={carousel}
        slotProps={{ slide: { py: 3 } }}
        sx={{ px: 0.5 }}
      >
        {list.map((item) => (
          <SingleCompetitionCard
            key={item.id}
            item={item}
            handleEnrollment={handleOpenEnrollmentConfirmationDialog}
          />
        ))}
      </Carousel>
      <CarouselArrowFloatButtons
        {...carousel.arrows}
        options={carousel.options}
      />

      <EnrollmentConfirmationDialog
        open={!!openDialog?.competitionId}
        onAgree={onAgreeEnrollment}
        onDisagree={handleCloseEnrollmentConfirmationDialog}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------
