import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import CSS file

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      return 'Password must contain uppercase, lowercase, number, and special character';
    }
    return '';
  };

  const handleEmailBlur = () => {
    setErrors(prev => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setErrors(prev => ({ ...prev, password: validatePassword(password) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({ email: emailError, password: passwordError });
    
    if (emailError || passwordError) return;

    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (remember) {
      localStorage.setItem('dietbalancer_login', JSON.stringify({ email }));
    } else {
      localStorage.removeItem('dietbalancer_login');
    }

    localStorage.setItem('dietbalancer_auth', JSON.stringify({
      email,
      role: email === 'demo@dietbalancer.com' ? 'admin' : 'user',
      token: 'demo_jwt_token_' + Date.now()
    }));

    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">🥗 DietBalancer</div>
          <p className="subtitle">Achieve Your Nutritional Goals</p>
        </div>

        {showSuccess && <div className="success-message show">✓ Login successful! Redirecting...</div>}

        <form onSubmit={handleSubmit}>
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
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

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
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? (
              <>
                <span className="btn-loader"></span>
                <span className="loading-text">Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          <div className="demo-credentials">
            <strong>Demo Credentials:</strong><br />
            Email: demo@dietbalancer.com<br />
            Password: Demo@123456
          </div>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="#signup">Create one now</a>
        </div>
      </div>
    </div>
  );
}
