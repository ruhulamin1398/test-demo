import * as React from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { EditNoteOutlined, Image } from "@mui/icons-material";
import { formatDateToHumanReadableDate } from "@/utils/date";
import { ICompetition, IRound, RoundJudgementCriteriaEnum } from "@/interfaces";
import {
  CompetitionUiModeEnum,
  setUiControlsRounds,
} from "@/store/slices/competitionSlice";
import { red } from "@mui/material/colors";

const CompetitionRounds: React.FC = () => {
  const competition = useSelector(
    (state: RootState) => state.competition.competition as ICompetition
  );
  const dispatch = useDispatch();

  const handleEnablingEditMode = (item: IRound) => {
    dispatch(
      setUiControlsRounds({
        mode: CompetitionUiModeEnum.UPDATE,
        recordToModify: item,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      {competition.rounds.map((round: IRound) => (
        <Grid key={round.id} size={{ xs: 12, sm: 12 }}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                >
                  {round.roundNumber}
                </Avatar>
              }
              action={
                <IconButton
                  onClick={() => handleEnablingEditMode(round)}
                  aria-label="settings"
                >
                  <EditNoteOutlined />
                </IconButton>
              }
              title={round.title}
              subheader={
                <Grid container spacing={2}>
                  <Grid>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      <Typography
                        component={"span"}
                        sx={{ color: "text.secondary" }}
                        variant="caption"
                      >
                        Start Date:
                      </Typography>
                      <Typography
                        variant="caption"
                        component={"span"}
                        sx={{ fontWeight: "medium" }}
                      >
                        {formatDateToHumanReadableDate(round.startDate)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component={"span"}
                        sx={{ color: "text.secondary" }}
                      >
                        End Date:
                      </Typography>
                      <Typography
                        variant="caption"
                        component={"span"}
                        sx={{ fontWeight: "medium" }}
                      >
                        {formatDateToHumanReadableDate(round.endDate)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Grid container spacing={0}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box>
                        <ListItemText
                          sx={{ p: 0 }}
                          primary="Judgement criteria"
                          secondary={round.judgementCriteria}
                        />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box>
                        <ListItemText
                          sx={{ p: 0 }}
                          primary="Max number of winners"
                          secondary={round.maxWinners}
                        />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box>
                        <ListItemText
                          sx={{ p: 0 }}
                          primary="Max number of votes/scores"
                          secondary={round.maxScore}
                        />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Box>
                        <ListItemText
                          sx={{ p: 0 }}
                          primary="Max number of winners"
                          secondary={round.judgementCriteria}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {round.judgementCriteria ===
                RoundJudgementCriteriaEnum.JUDGE ? (
                  <Box>
                    <Typography variant="body1">Jusges</Typography>
                    <Stack spacing={2} direction="row" sx={{ minWidth: 0 }}>
                      {round.judges.map((judge) => (
                        <List
                          disablePadding
                          key={judge.name}
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          <ListItem disableGutters disablePadding>
                            <ListItemAvatar>
                              <Avatar>
                                <Image />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${judge.firstName} ${judge.lastName}`}
                              secondary={`${judge.name}`}
                            />
                          </ListItem>
                        </List>
                      ))}
                    </Stack>
                  </Box>
                ) : null}
                <Grid size={{ xs: 12, sm: 12 }}></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompetitionRounds;
