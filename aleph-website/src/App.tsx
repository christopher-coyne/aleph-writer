import { Works } from "./features/texts";
import { FuzzyTest } from "./features/test/FuzzyTest";
import { HomePage } from "./features/misc";
import { Navbar } from "./components";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/works/:id" element={<Works />} />
            <Route path="/test" element={<FuzzyTest />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
