import { axios } from "../../../lib/axios";

type Props = { subdiv1: string | null; subdiv2: string | null };

export const getLocalText = ({ subdiv1, subdiv2 }: Props): Promise<any> => {
  return axios.get(`/api/texts/123?subdiv1=${subdiv1}&subdiv2=${subdiv2}`);
};
