import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';
import { AuthContext } from './AuthContext';

const theme = createTheme();

const AppShell = () => {
  const { successMessage } = React.useContext(AuthContext);

 
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Collapse in={!!successMessage}>
          <Alert
            severity="success"
            sx={{
              borderRadius: 0,
              justifyContent: 'center',
              fontWeight: 500,
            }}
          >
            {successMessage}
          </Alert>
        </Collapse>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
