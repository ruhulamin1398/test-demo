"use client";
import { Container, Typography } from "@mui/material";
import { MotionContainer } from "@/components/animate";
import PageContent from "./content";
import PageHeader from "./header";
import useCompetitionDetailsQuery from "@/hooks/use-competition-details";
import { SubmissionSkeleton } from "./submission-skeleton";

const MainView = () => {
  const { loading, competitionDetails } = useCompetitionDetailsQuery({});
  return (
    <Container component={MotionContainer}>
      {loading ? (
        <SubmissionSkeleton />
      ) : (
        <>
          {!loading && competitionDetails && (
            <>
              <PageHeader />
              <PageContent competition={competitionDetails} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default MainView;
