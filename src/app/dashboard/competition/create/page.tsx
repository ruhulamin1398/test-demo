"use client";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import CompetitionForm from "@/components/organisms/CompetitionForm";
import { ICompetition } from "@/interfaces";
import { useRouter } from "next/navigation";
const CreateCompetition = () => {
  const router = useRouter();
  const handleOnComplete = (competition: ICompetition) => {
    router.push(`/dashboard/competition/details/${competition.id}`);
  };
  return (
    <div>
      <Box p={2}>
        <Card>
          <CardHeader title="Create Competition" />
          <CardContent>
            <CompetitionForm onComplete={handleOnComplete} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default CreateCompetition;
