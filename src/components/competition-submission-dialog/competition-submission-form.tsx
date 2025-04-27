import { ICompetition } from "@/interfaces";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import FileUpload from "./FileUpload";
// ----------------------------------------------------------------------

type Props = BoxProps & {
  competition: ICompetition;
};

export function CompetitionSubmissionForm({
  competition,
  sx,
  ...other
}: Props) {
  console.log("Competition is", competition);
  return (
    <>
      <Box sx={{ mb: 3, paddingX: 3 }} {...other}>
        <Typography variant="h4" sx={{ whiteSpace: "pre-line", mb: 1 }}>
          {competition.title} : Round 1
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.64, mb: 1 }}>
          Submit your best nature photograph showcasing the beauty of forests.
          Images should capture the essence of wilderness, including trees,
          wildlife, or serene forest landscapes. Ensure the photo is original,
          high-quality, and reflects the theme of natural beauty. Let your
          creativity shine through the lens in this forest-focused contest!
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <FileUpload
            onSuccess={() => {}}
            currentImage={competition?.mediaUrl}
            id={competition?.id || undefined}
          />

          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={() => {}}>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------
