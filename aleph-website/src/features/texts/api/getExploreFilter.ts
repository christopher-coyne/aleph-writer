import { axios } from "../../../lib/axios";

export const getExploreFilter = ({
  filter,
}: {
  filter: string;
}): Promise<any> => {
  return axios.get(`/api/texts/123/global-info/${filter}`);
};
