"use client";
import React, { useEffect, useState } from "react"; // Import your Apollo Client instance
import { useParams } from "next/navigation";
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Tab,
  Tabs,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_COMPETITION_QUERY } from "@/graphql-client/competition";
import { useDispatch } from "react-redux";
import { setCompetition } from "@/store/slices/competitionSlice";
import { handleGraphQLError } from "@/utils/errorHandling";
import useNotification from "@/app/hooks/useNotification";
import AdminCompetitionBasicInfo from "@/components/organisms/AdminCompetitionBasicInfo";
import AdminCompetitionThumbnail from "@/components/organisms/AdminCompetitionThumbnail";
import AdminCompetitionRounds from "@/components/organisms/AdminCompetitionRounds";
import AdminPrizesAndRewars from "@/components/organisms/AdminPrizesAndRewars";
import AdminCompetitionEligibility from "@/components/organisms/AdminCompetitionEligibility";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`competition-details-tabpanel-${index}`}
      aria-labelledby={`competition-details-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `competition-details-tab-${index}`,
    "aria-controls": `competition-details-tabpanel-${index}`,
  };
}

const CompetitionDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { notify } = useNotification();
  const searchParams = useParams();
  const dispatch = useDispatch();
  const { id } = searchParams;
  const { data, loading, error } = useQuery(GET_COMPETITION_QUERY, {
    variables: { id },
    skip: !id, // Skip the query if `id` is not present
  });
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (!loading && data) {
      dispatch(setCompetition(data.getCompetition));
    }
    if (error) {
      notify({ severity: "error", message: handleGraphQLError(error) });
    }
  }, [data, loading, dispatch, error, notify]);

  return (
    <Container maxWidth="lg">
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs
          value={activeTab}
          textColor="inherit"
          onChange={handleChange}
          aria-label="competition detail tab"
        >
          <Tab label="Basic information" {...a11yProps(0)} />
          <Tab label="Rouns" {...a11yProps(1)} />
          <Tab label="Prizes" {...a11yProps(2)} />
          <Tab label="Eligibility" {...a11yProps(3)} />
          <Tab label="Thumbnail" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <Box py={2}>
        {loading ? (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            <CustomTabPanel value={activeTab} index={0}>
              <AdminCompetitionBasicInfo />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
              <AdminCompetitionRounds />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={2}>
              <AdminPrizesAndRewars />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={3}>
              <AdminCompetitionEligibility />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={4}>
              <AdminCompetitionThumbnail />
            </CustomTabPanel>
          </>
        )}
      </Box>
    </Container>
  );
};

export default CompetitionDetails;
