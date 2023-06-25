import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../../../lib/react-query";

type Props = {
  subdiv1: string | null;
  subdiv2: string | null;
  workId: string | null;
  filter: string | null;
};

/*
  themes - name + summary
  devices - name + summary
  characgters - name + summary. Maybe also relation? (son of xyz...)
  quotes - name + summary
  critcisism - name + summary
  related texts - name + summary
*/

export const getLocalTextFilterData = ({
  workId,
  subdiv1,
  subdiv2,
  filter,
}: Props): Promise<any> => {
  console.log("getting local text data...");
  return axios.get(
    `/api/texts/${workId}/local-info/${filter}?subdiv1=${subdiv1}&subdiv2=${subdiv2}`
  );
};

type QueryFnType = typeof getLocalTextFilterData;

type UseLocalSummaryOptions = {
  workId: string;
  subdiv1: string | null;
  subdiv2: string | null;
  filter: string | null;
  config?: QueryConfig<QueryFnType>;
};

export const useLocalTextFilterData = ({
  workId,
  subdiv1,
  subdiv2,
  filter,
  config,
}: UseLocalSummaryOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["localTextFilterData", workId, subdiv1, subdiv2],
    queryFn: () => getLocalTextFilterData({ filter, workId, subdiv1, subdiv2 }),
    ...config,
  });
};
