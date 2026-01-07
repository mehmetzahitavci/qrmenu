import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { CartProvider } from './context/CartContext';
import LandingPage from './components/LandingPage';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Routes>
            {/* Landing/Home Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Menu & Ordering Page with optional category parameter */}
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:categorySlug" element={<MenuPage />} />

            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminPage />} />

            {/* Fallback - redirect to home */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;