import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import HomePage from './pages/HomePage';
import TopBanner from './components/TopBanner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const theme = createTheme({
  palette: { mode: 'light' },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBanner />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
