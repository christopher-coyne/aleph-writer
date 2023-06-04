import { axios } from "../../../lib/axios";

type Props = {
  subdiv1: string | null;
  subdiv2: string | null;
  focus: string | undefined;
};

export const getFocusQuotes = ({
  subdiv1,
  subdiv2,
  focus,
}: Props): Promise<any> => {
  console.log("getting local text data...");
  return axios.get(
    `/api/texts/123/local-info/focus-quotes?subdiv1=${subdiv1}&subdiv2=${subdiv2}&focus=${focus}`
  );
};
