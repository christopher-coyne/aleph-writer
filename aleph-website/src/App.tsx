import { Navbar } from "./components";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { AppRoutes } from "./routes/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
