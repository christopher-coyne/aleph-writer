import { axios } from "../../../lib/axios";

type Props = { subdiv1: string | null; subdiv2: string | null };

export const getLocalText = ({ subdiv1, subdiv2 }: Props): Promise<any> => {
  return axios.get(`/works/123/subdiv?subdiv1=${subdiv1}&subdiv2=${subdiv2}`);
};
