import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Explore from './pages/Explore';
import VibeQuiz from './pages/VibeQuiz';
import Login from './pages/Login';
import './styles/globals.css';
import './pages/Home.css';
import FamilyProfile from './pages/FamilyProfile'
import HostRegister from './pages/HostRegister'
import Dashboard from './pages/Dashboard'
import Booking from './pages/Booking'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Cursor />
        <Navbar />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/quiz"    element={<VibeQuiz />} />
          <Route path="/login"   element={<Login />} />
          {/* Coming next: */}
           <Route path="/family/:id" element={<FamilyProfile />} />
<Route path="/host" element={<HostRegister />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
