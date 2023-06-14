import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";

export const getGlobalWorkInfo = (id: string): Promise<any> => {
  return axios.get(`/api/texts/${id}/global-info`);
};

type UseGetGlobalInfoOptions = {
  workId: string;
};

export const useGetGlobalInfo = ({ workId }: UseGetGlobalInfoOptions) => {
  // const { data, error, isLoading, isError } = useQuery('userInfo', fetchUserInfo);

  return useQuery({
    queryKey: ["globalInfo", workId],
    queryFn: () => getGlobalWorkInfo(workId),
  });
};
