import { Box, Card, CardHeader, Stack, Typography } from "@mui/material";

const NoActiveRoundFound = () => {
  return (
    <Card sx={{ my: 2 }}>
      <Stack
        spacing={2}
        sx={{
          p: { sx: 2, md: 4 },
          typography: "h6",
          bgcolor: "#eee",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h4">
            There are no acitve Round Available
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default NoActiveRoundFound;
