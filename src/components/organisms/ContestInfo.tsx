import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Grid from "@mui/material/Grid2";

const ContestInfo = () => {
  return (
    <Container sx={{ py: 0 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "white",
              borderRadius: 2,
              color: "#00000000",
              transition: "0.3s",
              paddingBottom: "48px",
              "&:hover": { boxShadow: 2 },
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="black">
              Round Details
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[
                "1st Round: Nature & Wildlife",
                "2nd Round: Portrait",
                "3rd Round: Street Photography",
                "Final Round: Abstract",
              ].map((round, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      transition: "0.3s",
                      "&:hover": { boxShadow: 4 },
                    }}
                    elevation={1}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      {round}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      {index === 0 &&
                        "Capture the beauty of natural landscapes and wildlife"}
                      {index === 1 &&
                        "Human portraits that tell compelling stories"}
                      {index === 2 && "Urban life and street culture moments"}
                      {index === 3 && "Creative and experimental photography"}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Rules & Guidelines */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              transition: "0.3s",
              backgroundColor: "white",
              marginTop: 5,
              "&:hover": { boxShadow: 2 },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Rules & Guidelines
            </Typography>
            <List sx={{ mt: 1 }}>
              {[
                "Images must be original and taken within the last 12 months",
                "Basic editing allowed (color, contrast, crop)",
                "Maximum 3 entries per category",
              ].map((rule, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Sponsors & Share Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              transition: "0.3s",
              backgroundColor: "white",
              "&:hover": { boxShadow: 2 },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Sponsors
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              {[FacebookIcon, TwitterIcon, LinkedInIcon, WhatsAppIcon].map(
                (Icon, index) => (
                  <IconButton key={index} color="primary">
                    <Icon />
                  </IconButton>
                )
              )}
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: 4,
              p: 3,
              borderRadius: 2,
              transition: "0.3s",
              backgroundColor: "white",
              "&:hover": { boxShadow: 2 },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Share Contest
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              {[FacebookIcon, TwitterIcon, LinkedInIcon, WhatsAppIcon].map(
                (Icon, index) => (
                  <IconButton key={index} color="primary">
                    <Icon />
                  </IconButton>
                )
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContestInfo;
