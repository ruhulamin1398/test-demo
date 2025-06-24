import { Card, CardProps, Typography, Box } from "@mui/material";
import { ICompetition, IRound } from "@/interfaces";

import { useState } from "react";
import CompetitionRoundPopUp from "@/components/round-popup";
import RoundDetailsCard from "./round-details-card";
import ShowMoreLessText from "@/components/show-more-less-text";

// ----------------------------------------------------------------------
type ContestDetailsContentProps = CardProps & {
  competition: ICompetition;
};

const ContestDetailsContent = ({ competition }: ContestDetailsContentProps) => {
  const renderHead = () => (
    <>
      <Card sx={[{ py: 3, pl: 3, pr: 2.5 }]}>
        <Box sx={{ mb: 2, display: "flex" }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            {competition?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            mb: 2,
            gap: 0.5,
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          <Box
            component="span"
            sx={{ typography: "body2", color: "text.primary" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Enrollment Fee :
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              {competition?.price == 0
                ? "Free Of Cost "
                : `${competition?.price} Tk`}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mb: 2,
            gap: 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Box component="span">
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Eligibility
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">{competition?.eligibility}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mb: 2,
            gap: 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Box component="span">
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              OverView
            </Typography>
          </Box>
          <Box>
            <ShowMoreLessText text={competition?.description} maxLength={200} />
          </Box>
        </Box>
      </Card>
    </>
  );

  const renderRoundDetails = () => {
    const [currentRound, setCurrentRound] = useState<IRound | null>(null);

    const handleDialogClose = () => {
      setCurrentRound(null);
    };
    return (
      <>
        <Box>
          <Typography variant="h6" sx={{ my: 2 }}>
            Rounds
          </Typography>

          <Box
            sx={{
              rowGap: 2,
              columnGap: 2,
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              },
            }}
          >
            {competition?.rounds?.map((round) => (
              <RoundDetailsCard
                round={round}
                key={round.id}
                handlePopUp={setCurrentRound}
              />
            ))}
          </Box>
        </Box>

        <CompetitionRoundPopUp
          handleDialogClose={handleDialogClose}
          round={currentRound}
        />
      </>
    );
  };

  return (
    <>
      <Box>
        {renderHead()}

        {/* <Divider sx={{ borderStyle: "dashed", mt: 5, mb: 2 }} /> */}
        {renderRoundDetails()}
      </Box>
    </>
  );
};

export default ContestDetailsContent;
