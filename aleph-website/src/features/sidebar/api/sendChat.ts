import { axios } from "../../../lib/axios";

export const postMessage = ({ data }: { data: string }): Promise<any> => {
  return axios.post("/api/chat", data);
};
