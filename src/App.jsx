import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import authService from './appwrite/auth.js';
import { login, logout } from './features/authSlice.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [loading, setLoading] = useState( true ); // loading controls WHEN to render, Redux controls WHAT to render
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (isAuthenticated) {
    return <p>Welcome, you are logged in</p>;
  }

  return (
    <div>
      <Header />
      <p>Welcome to my Blog App</p>
      <Footer />
    </div>
  )
}

export default App;