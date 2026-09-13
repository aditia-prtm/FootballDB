import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/layout/Layout';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
