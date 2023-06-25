import { Navbar } from "./components";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { AppRoutes } from "./routes/index";
import { AppProvider } from "./providers/app";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <div className="App">
          <Navbar />
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
