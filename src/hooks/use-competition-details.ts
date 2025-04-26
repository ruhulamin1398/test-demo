"use client";
import { GET_COMPETITION_QUERY } from "@/graphql-client/competition";
import { ICompetition } from "@/interfaces";
import { handleGraphQLError } from "@/utils/errorHandling";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type Props = { competitionId?: string };

export const useCompetitionDetailsQuery = ({ competitionId }: Props) => {
  const [apiError, setApiError] = useState<string>();
  const [competitionDetails, setCompetitionDetails] = useState<
    ICompetition | undefined | null
  >();
  const searchParams = useParams();
  const { id } = searchParams;
  const { data, loading, error } = useQuery(GET_COMPETITION_QUERY, {
    variables: { id },
    skip: !id && !competitionId, // Skip the query if `id` is not present
  });
  useEffect(() => {
    if (data?.getCompetition) {
      setCompetitionDetails(data.getCompetition);
    }
    if (error) {
      const errorMessage = handleGraphQLError(error);
      setApiError(errorMessage);
    }
  }, [data, loading, error]);
  console.log(competitionDetails, data, loading, error);
  return { loading, competitionDetails, error: apiError };
};

export default useCompetitionDetailsQuery;
