import { Stack } from "../../../components/Stack/Stack";
import { Box } from "../../../components/Box/styled.box";

const works = {
  plays: [
    { title: "Hamlet", author: "William Shakespeare", link: "www.google.com" },
    {
      title: "King Lear",
      author: "William Shakespeare",
      link: "www.google.com",
    },
    {
      title: "Tamerlane",
      author: "Christopher Marlowe",
      link: "www.google.com",
    },
  ],
  poetry: [
    { title: "The Wasteland", author: "T.S Elliot", link: "www.google.com" },
    { title: "Brooklyn Bridge", author: "Hart Crane", link: "www.google.com" },
    { title: "The Iliad", author: "Homer", link: "www.google.com" },
  ],
  novels: [
    {
      title: "Gulliver's Travels",
      author: "Jonathan Swift",
      link: "www.google.com",
    },
    {
      title: "Great Expectations",
      author: "Charles Dickens",
      link: "www.google.com",
    },
    { title: "Moby Dick", author: "Herman Melville", link: "www.google.com" },
  ],
};

export const WorksList = () => {
  return (
    <div>
      <Stack spacing={3} direction="column">
        <Box>
          <h3>Plays</h3>
        </Box>
        <Box>
          <h3>Novels</h3>
        </Box>
        <Box>
          <h3>Poems</h3>
        </Box>
      </Stack>
    </div>
  );
};
