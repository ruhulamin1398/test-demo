import { client } from "@/lib/apolloClient";
import MainView from "./view/main-view";
type Props = {};

const Submission = (props: Props) => {
  // const {competitionId} = useParams() // next/navigation
  // const {user} = getServerSession()
  // const submissionInfo = await client.query(QUERY_NAME, {payload: {userId: user.id, competitionId}})

  return <MainView />;
};

export default Submission;
