import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/About/AboutPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/Contact/ContactPage";
import HomePage from "../../features/Home/HomePage";
import Header from "./Header";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette:{
      mode : paletteType,
      background:{
        default:paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode)
  }
  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
     <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/catalog" component={Catalog} />
      <Route path="/catalog/:id" component={ProductDetails} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route />
      </Container>
    </ThemeProvider>
    
     
    </>
  );
}

export default App;
