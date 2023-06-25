import { Points, Point } from "./GlobalPoints.styled";
import { useGlobalInfo } from "../../texts/api/getGlobalWorkInfo";

export const GlobalPoints = () => {
  const { data, isLoading, isError } = useGlobalInfo({ workId: "123" });

  console.log("global info data DOWN ", data);

  console.log("data in global points ", data);
  return (
    <Points>
      <Point>Written: {data?.data.written}</Point>
      <Point>Author: {data?.data.author}</Point>
      <Point>Length: {data?.data.length}</Point>
      <Point>Genre: {data?.data.genre}</Point>
    </Points>
  );
};
