import { axios } from "../../../lib/axios";

type Props = {
  subdiv1: string | null;
  subdiv2: string | null;
};

export const getLocalSummary = ({ subdiv1, subdiv2 }: Props): Promise<any> => {
  console.log("getting local text data...");
  return axios.get(
    `/api/texts/123/summary?subdiv1=${subdiv1}&subdiv2=${subdiv2}`
  );
};
