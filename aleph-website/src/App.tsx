import { Navbar } from "./components";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/index";
import { AppProvider } from "./providers/app";
import { ThemeProviderWrapper } from "./providers/mode";

function App() {
  return (
    <ThemeProviderWrapper>
      <AppProvider>
        <div className="App">
          <Navbar />
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </AppProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
