import { Box, CircularProgress, Paper } from "@mui/material";

interface LoadingContainerProps {
  height?: number;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  height = 200,
}) => (
  <Paper>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height,
      }}
    >
      <CircularProgress />
    </Box>
  </Paper>
);

export default LoadingContainer;
