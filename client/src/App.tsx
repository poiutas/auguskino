import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/catalog/MainPage";
// import MovieCard from "./components/catalog/MovieCard";
import Header from "./components/layout/Header";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import Register from "./components/registration/Register";

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  function toggleFunction() {
    setDarkMode(prevState => !prevState)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleFunction={toggleFunction} darkMode={darkMode} />
      <Container>
        {/* <MovieCard /> */}

        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Container>

    </ThemeProvider>
  );
}

export default App;
