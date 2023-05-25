import { Container } from "./LocalContent.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getLocalText } from "../api/getLocalText";
import { MyLocalContext } from "../../works/contexts/LocalContext";

export const LocalContent = () => {
  const { setLocalInfo, text } = useContext(MyLocalContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const subdiv1 = query.get("subdiv1");
  const subdiv2 = query.get("subdiv2");

  useEffect(() => {
    const fetchLocalText = async () => {
      const { data } = await getLocalText({ subdiv1, subdiv2 });
      console.log("data ", data);
      setLocalInfo((prevLocalInfo) => ({ ...prevLocalInfo, text: data }));
    };
    fetchLocalText();
  }, [subdiv1, subdiv2]);
  return <Container>{text}</Container>;
};
