import React, { useState, useMemo, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home/Home"));
const Music = React.lazy(() => import("./pages/Music/Music"));
const Meditation = React.lazy(() => import("./pages/Meditation/Meditation"));
const About = React.lazy(() => import("./pages/About/About"));
const Memes = React.lazy(() => import("./pages/Memes/Memes"));
const Meet = React.lazy(() => import("./pages/Meet/Meet"));
const ChatBotPage = React.lazy(() => import("./pages/ChatBot/ChatBot"));

// Import components
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));

// Create ThemeContext for sharing theme mode and toggle function
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

function App() {
  // Initialize theme mode from localStorage or default to light
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "dark" || savedMode === "light" ? savedMode : "light";
  });

  // Create theme object based on current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#6a5acd", // Purple-ish color for calming effect
          },
          secondary: {
            main: "#f06292", // Pink for a positive mood
          },
          background: {
            default: mode === "light" ? "#f8f9fa" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        typography: {
          fontFamily: '"Outfit", "Roboto", "Arial", sans-serif',
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 600,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
          button: {
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  // Theme toggle function
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/meditation" element={<Meditation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/memes" element={<Memes />} />
                  <Route path="/meet" element={<Meet />} />
                  <Route path="/chat" element={<ChatBotPage />} />
                </Routes>
              </div>
              <Footer />
            </React.Suspense>
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
