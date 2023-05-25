import { useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Content, Header } from "./works.styled";
import { useLocation } from "react-router-dom";
import { Sidebar } from "../../sidebar/components/Sidebar";
import { TextContent } from "../../textcontent/components/TextContent";
import { GlobalContext } from "../contexts/GlobalContext";
import { getGlobalWorkInfo } from "../api/getGlobalWorkInfo";
import { MyContext } from "../contexts/GlobalContext";
import { getExploreFilter } from "../api/getExploreFilter";
import { Button } from "../../../components/Button/styled.button";
import { LocalContext } from "../contexts/LocalContext";

// works - homepage for all works (books, plays, poetry, lyrics...)
// works/hamlet_id - homepage for work - general view of work
// works/hamlet_id?act=2&scene=3 - Page specific work
export const Works = () => {
  return (
    <GlobalContext>
      <LocalContext>
        <WorksLayout />
      </LocalContext>
    </GlobalContext>
  );
};

// separated so can set context
const WorksLayout = () => {
  // let { id } = useParams();
  // console.log("param ", id);
  const { setGlobalInfo, subdivisions } = useContext(MyContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const explore = searchParams.get("explore");
  const view = searchParams.get("view");
  const subdiv1 = searchParams.get("subdiv1");
  const subdiv2 = searchParams.get("subdiv2");

  const handleSubdivChange = (
    event: ChangeEvent<HTMLSelectElement>,
    subdiv: string
  ) => {
    searchParams.set(subdiv, event.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getGlobalWorkInfo({ id: "123" });
      console.log("data ");
      setGlobalInfo((prevGlobalInfo) => ({
        ...prevGlobalInfo,
        quote: data.quote,
        summary: data.summary,
        subdivisions: data.subdivisions,
      }));
    };
    getData();
  }, []);

  // get data for whatever filter it currently is
  useEffect(() => {
    const fetchFilterData = async () => {
      if (explore === "themes") {
        const { data } = await getExploreFilter({ filter: explore });
        setGlobalInfo((prevGlobalInfo) => ({
          ...prevGlobalInfo,
          themes: data,
        }));
      }
    };
    fetchFilterData();
  }, [explore]);

  // creates array from 1 to n of all subdivisons of subdivision e.g. scenes of a play
  const subdiv2Array = Array.from(
    {
      length: subdivisions
        ? subdivisions.divisions[parseInt(subdiv1 || "1") - 1].div2 || 0
        : 0,
    },
    (_, index) => index + 1
  );

  console.log("subdiv1 ", subdiv1, "subdiv2 ");
  console.log("subdiv2array ", subdiv2Array);
  return (
    <Layout>
      <Content>
        <Header>
          <h1>King Lear</h1>
          <div>
            <Button
              onClick={() => {
                if (view === "local") {
                  searchParams.set("view", "global");
                } else {
                  if (!subdiv1) {
                    searchParams.set("subdiv1", "1");
                  }
                  if (!subdiv2) {
                    searchParams.set("subdiv2", "2");
                  }
                  searchParams.set("view", "local");
                }
                setSearchParams(searchParams);
              }}
            >
              Global
            </Button>
            <select
              value={subdiv1 || "1"}
              onChange={(e) => handleSubdivChange(e, "subdiv1")}
            >
              {subdivisions?.divisions.map((_, idx) => (
                <option value={idx + 1}>Act {idx + 1}</option>
              ))}
            </select>
            <select
              value={subdiv2 || "1"}
              onChange={(e) => handleSubdivChange(e, "subdiv2")}
            >
              {subdiv2Array.map((num) => (
                <option value={num}>Scene {num}</option>
              ))}
            </select>
          </div>
        </Header>
        <TextContent />
      </Content>
      <Sidebar />
    </Layout>
  );
};
