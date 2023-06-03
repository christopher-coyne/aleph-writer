import { axios } from "../../../lib/axios";

type Props = {
  subdiv1: string | null;
  subdiv2: string | null;
  filter: string | null;
};

/*
  themes - name + summary
  devices - name + summary
  characgters - name + summary. Maybe also relation? (son of xyz...)
  quotes - name + summary
  critcisism - name + summary
  related texts - name + summary
*/

export const getLocalTextFilterData = ({
  subdiv1,
  subdiv2,
  filter,
}: Props): Promise<any> => {
  console.log("getting local text data...");
  return axios.get(
    `/api/texts/123/local-info/${filter}?subdiv1=${subdiv1}&subdiv2=${subdiv2}`
  );
};
