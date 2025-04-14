import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";

import { CompetitionItem } from "./CompetitionItem";
import { CompetitionItemSkeleton } from "./CompetitionItemSkeleton";
import { ICompetition } from "@/interfaces";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  competitions: ICompetition[];
};

export function CompetitionList({
  competitions,
  loading,
  sx,
  ...other
}: Props) {
  const renderLoading = () => <CompetitionItemSkeleton />;

  const renderList = () =>
    competitions.map((competition) => (
      <CompetitionItem
        key={competition.id}
        competition={competition}
        detailsHref={"add-path-later"}
      />
    ));

  return (
    <>
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
        {loading ? renderLoading() : renderList()}
      </Box>
    </>
  );
}
