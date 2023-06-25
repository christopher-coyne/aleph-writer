import { ClipLoader } from "react-spinners";
import { Container } from "./Spinner.styled";

type SpinnerProps = {
  height?: number;
};

export const Spinner = ({ height }: SpinnerProps) => {
  return (
    <Container height={height}>
      <ClipLoader color="rgb(0, 0, 0)" size={50} />
    </Container>
  );
};
