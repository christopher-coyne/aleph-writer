import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../../../lib/react-query";

type Props = {
  subdiv1: string | null;
  subdiv2: string | null;
  workId: string | null;
};

export const getLocalSummary = ({
  workId,
  subdiv1,
  subdiv2,
}: Props): Promise<any> => {
  console.log("getting local text data...");
  return axios.get(
    `/api/texts/${workId}/summary?subdiv1=${subdiv1}&subdiv2=${subdiv2}`
  );
};

type QueryFnType = typeof getLocalSummary;

type UseLocalSummaryOptions = {
  workId: string;
  subdiv1: string | null;
  subdiv2: string | null;
  config?: QueryConfig<QueryFnType>;
};

export const useLocalSummary = ({
  workId,
  subdiv1,
  subdiv2,
  config,
}: UseLocalSummaryOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["localsummary", workId, subdiv1, subdiv2],
    queryFn: () => getLocalSummary({ workId, subdiv1, subdiv2 }),
    ...config,
  });
};
