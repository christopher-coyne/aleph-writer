import { axios } from "../../../lib/axios";

export const getGlobalWorkInfo = ({ id }: { id: string }): Promise<any> => {
  return axios.get(`works/${id}/global-info`);
};
