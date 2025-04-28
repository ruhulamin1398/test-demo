import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import {
  Carousel,
  useCarousel,
  CarouselArrowFloatButtons,
} from "@/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ICompetition } from "@/interfaces";
import { useCompetitionHandleEnrollmentDialog } from "@/app/hooks/competitionHandleErollmentDialogHook";
import EnrollmentConfirmationDialog from "@/components/confirmation-dialog";
import { CompetitionItemSkeleton } from "@/app/competition/components/CompetitionItemSkeleton";
import { SingleCompetitionCard } from "../common/single-competition-card";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title: string;
  loading?: boolean;
  list: ICompetition[];
};

export function HomeFeaturedContestCarousel({
  title,
  loading,
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
      <CompetitionItemSkeleton itemCount={4} />{" "}
    </Box>
  );
  const renderList = () => {
    return (
      <>
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
      </>
    );
  };
  return (
    <Box sx={{ mb: 3, paddingX: 3, position: "relative" }} {...other}>
      {loading ? renderLoading() : renderList()}

      <EnrollmentConfirmationDialog
        open={!!openDialog?.competitionId}
        onAgree={onAgreeEnrollment}
        onDisagree={handleCloseEnrollmentConfirmationDialog}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------
