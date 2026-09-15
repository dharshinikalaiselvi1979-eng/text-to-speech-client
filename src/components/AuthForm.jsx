import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from './ErrorMessage';

function AuthForm() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) throw signUpError;
        setNotice('Account created! Check your email to confirm, then log in.');
        setMode('login');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-sheet">
      <div className="form-sheet__eyebrow">{mode === 'login' ? 'Welcome back' : 'New here'}</div>
      <h2 className="form-sheet__heading">{mode === 'login' ? 'Log in' : 'Create an account'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="field__label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="textarea"
            style={{ minHeight: 'auto' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="textarea"
            style={{ minHeight: 'auto' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </div>

        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
        </button>

        {notice && <p className="field__meta" style={{ color: 'var(--teal)', marginTop: 16 }}>{notice}</p>}
        <ErrorMessage message={error} />
      </form>

      <button
        type="button"
        className="btn btn--secondary"
        onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setNotice(''); }}
      >
        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>
    </div>
  );
}

export default AuthForm;