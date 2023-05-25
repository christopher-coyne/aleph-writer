import { axios } from "../../../lib/axios";

export const getExploreFilter = ({
  filter,
}: {
  filter: string;
}): Promise<any> => {
  return axios.get(`/works/123/global-info/${filter}`);
};
