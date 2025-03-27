import * as React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  BeenhereOutlined,
  CalendarMonthOutlined,
  CategoryOutlined,
  CheckCircleOutline,
  PriceCheckOutlined,
  Schedule,
} from "@mui/icons-material";
import { formatDateToHumanReadableDate } from "@/utils/date";

const AdminCompetitionInfo: React.FC = () => {
  const competition = useSelector(
    (state: RootState) => state.competition.competition
  );
  return (
    <Box>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemIcon
            sx={{
              svg: {
                fontSize: "2rem",
              },
            }}
          >
            <CalendarMonthOutlined />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={"Competition Deadline"}
            secondary={
              <Grid container spacing={2}>
                <Grid>
                  <Box
                    sx={{ display: "flex", gap: 1, textTransform: "uppercase" }}
                  >
                    <Typography
                      component={"span"}
                      sx={{ color: "text.secondary" }}
                      variant="body2"
                    >
                      Start Date:
                    </Typography>
                    <Typography
                      variant="body2"
                      component={"span"}
                      sx={{ fontWeight: "medium" }}
                    >
                      {formatDateToHumanReadableDate(competition?.startDate)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    sx={{ display: "flex", gap: 1, textTransform: "uppercase" }}
                  >
                    <Typography
                      variant="body2"
                      component={"span"}
                      sx={{ color: "text.secondary" }}
                    >
                      End Date:
                    </Typography>
                    <Typography
                      variant="body2"
                      component={"span"}
                      sx={{ fontWeight: "medium" }}
                    >
                      {formatDateToHumanReadableDate(competition?.endDate)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            }
          />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemIcon
            sx={{
              svg: {
                fontSize: "2rem",
              },
            }}
          >
            <Schedule />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={"Enrolment Deadline"}
            secondary={
              <Grid container spacing={2}>
                <Grid>
                  <Box
                    sx={{ display: "flex", gap: 1, textTransform: "uppercase" }}
                  >
                    <Typography
                      component={"span"}
                      sx={{ color: "text.secondary" }}
                      variant="body2"
                    >
                      Start Date:
                    </Typography>
                    <Typography
                      variant="body2"
                      component={"span"}
                      sx={{ fontWeight: "medium" }}
                    >
                      {formatDateToHumanReadableDate(
                        competition?.enrolmentDeadline.startDate
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    sx={{ display: "flex", gap: 1, textTransform: "uppercase" }}
                  >
                    <Typography
                      component={"span"}
                      sx={{ color: "text.secondary" }}
                      variant="body2"
                    >
                      End Date:
                    </Typography>
                    <Typography
                      variant="body2"
                      component={"span"}
                      sx={{ fontWeight: "medium" }}
                    >
                      {formatDateToHumanReadableDate(
                        competition?.enrolmentDeadline.endDate
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            }
          />
        </ListItem>
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemIcon
            sx={{
              svg: {
                fontSize: "2rem",
              },
            }}
          >
            <BeenhereOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{ mr: 2 }}
            primary={"Enrolment type"}
            secondary="Enrolment type can be either Free and Paid."
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: 900, color: "primary.main" }}
          >
            {competition?.enrolmentType}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemIcon
            sx={{
              svg: {
                fontSize: "2rem",
              },
            }}
          >
            <PriceCheckOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{ mr: 2 }}
            primary={"Enrolment Fee"}
            secondary="If enrolment type is Free, user need to pay this amount to proceed enrolment."
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: 900, color: "primary.main" }}
          >
            {`TK. ${competition?.price}`}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemIcon
            sx={{
              svg: {
                fontSize: "2rem",
              },
            }}
          >
            <CategoryOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{ mr: 2 }}
            primary={"Submission type"}
            secondary="Based on submission type, user will get option to submit the demand."
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: 900, color: "primary.main" }}
          >
            {competition?.submissionType}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemIcon
            sx={{
              svg: {
                fontSize: "2rem",
              },
            }}
          >
            <CheckCircleOutline />
          </ListItemIcon>
          <ListItemText
            sx={{ mr: 2 }}
            primary={"Status"}
            secondary="Competion will be displayed on APP if the status is not Draft."
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: 900, color: "primary.main" }}
          >
            {competition?.status}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminCompetitionInfo;
