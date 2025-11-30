import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dietbalancer_login') || '{}');
    if (saved.email) {
      setEmail(saved.email);
      setRemember(true);
    }
  }, []);

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!emailPattern.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (value !== 'Demo@123456' && !passwordPattern.test(value)) {
      return 'Must include: uppercase, lowercase, number, special character (@$!%*?&)';
    }
    return '';
  };

  const validateConfirmPassword = (value) => {
    if (isSignUp && !value) return 'Please confirm your password';
    if (isSignUp && value !== password) return 'Passwords do not match';
    return '';
  };

  const handleEmailBlur = () => {
    setErrors(prev => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setErrors(prev => ({ ...prev, password: validatePassword(password) }));
  };

  const handleConfirmPasswordBlur = () => {
    setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(confirmPassword) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = isSignUp ? validateConfirmPassword(confirmPassword) : '';
    
    setErrors({ 
      email: emailError, 
      password: passwordError,
      confirmPassword: confirmPasswordError 
    });
    
    if (emailError || passwordError || confirmPasswordError) return;

    setLoading(true);
    
    try {
      const endpoint = isSignUp ? '/signup' : '/signin';
      const payload = {
        email,
        password
      };

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Save to localStorage
        if (remember && !isSignUp) {
          localStorage.setItem('dietbalancer_login', JSON.stringify({ email }));
        } else {
          localStorage.removeItem('dietbalancer_login');
        }

        localStorage.setItem('dietbalancer_auth', JSON.stringify({
          email,
          userId: data.userId,
          role: email === 'demo@dietbalancer.com' ? 'admin' : 'user',
          token: 'jwt_token_' + Date.now(),
          loginType: isSignUp ? 'signup' : 'login'
        }));

        setShowSuccess(true);
        if (onLoginSuccess) onLoginSuccess();
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        // Show error message from backend
        setErrors(prev => ({
          ...prev,
          email: data.error || 'Authentication failed'
        }));
        setLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setErrors(prev => ({
        ...prev,
        email: 'Server connection error. Make sure backend is running on port 3000.'
      }));
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">🥗 DietBalancer</div>
          <p className="subtitle">Achieve Your Nutritional Goals</p>
        </div>

        {showSuccess && (
          <div className="success-message show">
            ✓ {isSignUp ? 'Account created' : 'Login'} successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-tabs">
            <button
              type="button"
              className={`tab-button ${!isSignUp ? 'active' : ''}`}
              onClick={() => {
                setIsSignUp(false);
                setErrors({ email: '', password: '', confirmPassword: '' });
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-button ${isSignUp ? 'active' : ''}`}
              onClick={() => {
                setIsSignUp(true);
                setErrors({ email: '', password: '', confirmPassword: '' });
              }}
            >
              Sign Up
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                className={errors.email ? 'error' : ''}
              />
              {email && !errors.email && <span className="input-check">✓</span>}
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {password && !errors.password && <span className="input-check">✓</span>}
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
            {isSignUp && <div className="password-hint">Min 8 chars: uppercase, lowercase, number, special char</div>}
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleConfirmPasswordBlur}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
                {confirmPassword && !errors.confirmPassword && password === confirmPassword && (
                  <span className="input-check">✓</span>
                )}
              </div>
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
          )}

          {!isSignUp && (
            <div className="remember-forgot">
              <div className="remember-group">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember" className="remember-label">Remember me</label>
              </div>
              <a href="#forgot" className="forgot-password">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? (
              <>
                <span className="btn-loader"></span>
                <span className="loading-text">Processing...</span>
              </>
            ) : (
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            )}
          </button>

          {!isSignUp && (
            <div className="demo-credentials">
              <strong>📝 Demo Credentials:</strong><br />
              Email: demo@dietbalancer.com<br />
              Password: Demo@123456
            </div>
          )}
        </form>
      </div>
    </div>
  );
}