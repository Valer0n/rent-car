import React from "react";
import "./App.css";
import { MantineProvider, ColorSchemeProvider, } from "@mantine/core";
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import HomePage from "./pages/HomePage/HomePage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FAQ from "./pages/FAQ/FAQ";
import NotFound from "./components/NotFound/NotFound";
import MyHeader from "./components/Header/Header";
import Backoffice from "./pages/Backoffice/Backoffice";
import Login from "./components/Login/Login";
import { AuthProvider } from "./HOC/Auth";
import { RequireAuth } from "./HOC/RequireAuth";



function App() {
  let colorMode = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  }), colorScheme = colorMode[0], setColorScheme = colorMode[1];
  let toggleColorScheme = function (value) {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };
  useHotkeys([['mod+J', function () { return toggleColorScheme(); }]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Poppins, sans-serif",
          colors: {
            brand: [
              "#86B871",
              "#73BA55",
              "#61BB3A",
              "#52B926",
              "#44B912",
              "#43971F",
              "#417E27",
              "#3D692B",
              "#3A592C",
              "#354C2C",
            ],
          },
          primaryColor: "brand",
          breakpoints: {
            xs: 670,
            lg: 1080,
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <AuthProvider>
            <MyHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/backoffice" element={<RequireAuth><Backoffice /></RequireAuth>} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
