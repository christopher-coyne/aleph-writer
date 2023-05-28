import { axios } from "../../../lib/axios";

export const getExploreFilter = ({
  filter,
}: {
  filter: string;
}): Promise<any> => {
  return axios.get(`/api/texts/123/local-info/${filter}?subdiv1=5&subdiv2=1`);
};
