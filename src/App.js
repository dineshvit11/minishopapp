// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Alert from '@mui/material/Alert';
// import Collapse from '@mui/material/Collapse';
// import { AuthProvider } from './AuthContext';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
// import './App.css';
// import { AuthContext } from './AuthContext';

// const theme = createTheme();

// const AppShell = () => {
//   const { successMessage } = React.useContext(AuthContext);

//   return (
//     <Router>
//       <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//         <Header />
//         <Collapse in={!!successMessage}>
//           <Alert
//             severity="success"
//             sx={{
//               borderRadius: 0,
//               justifyContent: 'center',
//               fontWeight: 500,
//             }}
//           >
//             {successMessage}
//           </Alert>
//         </Collapse>
//         <main style={{ flex: 1 }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AuthProvider>
//         <AppShell />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;


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

/* =========================================
   SONARQUBE TEST ISSUES START
   ========================================= */

// Hardcoded password (Security Hotspot)
const adminPassword = 'admin123';

// Hardcoded API key
const apiKey = 'sk_test_secret_key';

// Duplicate code block
const addNumbers1 = (a, b) => {
  return a + b;
};

const addNumbers2 = (a, b) => {
  return a + b;
};

const addNumbers3 = (a, b) => {
  return a + b;
};

// Unsafe eval usage
eval("console.log('Unsafe eval detected')");

// Unused variable
const unusedVariable = 'unused';

// Unused function
const unusedFunction = () => {
  console.log('This function is never used');
};

// Console logs
console.log(adminPassword);
console.log(apiKey);

// Nested unnecessary condition
const checkValue = (value) => {
  if (value) {
    if (value === true) {
      return true;
    }
  }
  return false;
};

checkValue(true);

eval("console.log('unsafe')");
const password = "Admin@123";
const apiKey = "sk_test_secret_key";

/* =========================================
   SONARQUBE TEST ISSUES END
   ========================================= */

const AppShell = () => {
  const { successMessage } = React.useContext(AuthContext);

  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
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