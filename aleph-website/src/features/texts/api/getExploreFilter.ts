import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../../../lib/react-query";

export const getExploreFilter = ({
  filter,
}: {
  filter: string;
}): Promise<any> => {
  return axios.get(`/api/texts/123/global-info/${filter}`);
};

type QueryFnType = typeof getExploreFilter;

type UseCommentsOptions = {
  filter: string;
  config?: QueryConfig<QueryFnType>;
};

export const useFilter = ({ filter, config }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["global" + filter, filter],
    queryFn: () => getExploreFilter({ filter }),
    ...config,
  });
};
