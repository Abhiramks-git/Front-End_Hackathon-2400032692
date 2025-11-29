import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUser(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('foodLogs');
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      {/* Logout Button - TOP RIGHT CORNER */}
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(15, 75, 3, 0.7)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 6px 20px rgba(7, 82, 5, 0.4)',
          zIndex: 9999
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(238, 82, 83, 1)';
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(238, 82, 83, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(238, 82, 83, 0.9)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 82, 83, 0.4)';
        }}>
        <span>🚪</span>
        Logout
      </button>

      {/* Main Navbar */}
      <nav style={{
        background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 25%, rgba(240, 147, 251, 0.95) 50%, rgba(79, 172, 254, 0.95) 75%, rgba(0, 242, 254, 0.95) 100%)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '12px',
        margin: '15px',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Logo on Left */}
        <Link to="/dashboard" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}>
          <span style={{ fontSize: '32px' }}>🥗</span>
          <span>DietBalancer</span>
        </Link>

        {/* Center Navigation Links */}
        <div style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flex: 1
        }}>
          <Link to="/dashboard" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <span>📊</span>
            Dashboard
          </Link>

          <Link to="/food-log" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <span>🍎</span>
            Food Log
          </Link>

          <Link to="/admin" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <span>⚙️</span>
            Admin
          </Link>
        </div>

        {/* Right Side: Just show user email */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          {user && (
            <span style={{
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              opacity: 0.9
            }}>
              👤 {user}
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
