import { useState, useMemo } from 'react';
import './LoginPage.css';

const initialForm = {
  email: '',
  password: '',
  remember: false
};

function LoginPage() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = form.email.trim().length > 0;
  const isPasswordValid = form.password.length >= 6;
  const formIsValid = isEmailValid && isPasswordValid;

  const validationSummary = useMemo(() => {
    if (!submitted) return '';
    if (formIsValid) return 'Looking good! Ready to submit.';
    if (!isEmailValid) return 'Please enter your email or username.';
    if (!isPasswordValid) return 'Password needs at least 6 characters.';
    return '';
  }, [formIsValid, isEmailValid, isPasswordValid, submitted]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!formIsValid) return;
    setTimeout(() => {
      alert('Form submitted! In a real app this would call your authentication API.');
    }, 250);
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="card-heading">
          <p className="eyebrow">SECURE ACCESS</p>
          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to continue to your dashboard</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="input-label" htmlFor="email">
            Email or username
            <input
              id="email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              className={touched.email && !isEmailValid ? 'input-error' : ''}
              aria-invalid={!isEmailValid}
              aria-describedby="email-helper"
            />
          </label>
          <span id="email-helper" className="helper-text">
            {touched.email && !isEmailValid ? 'This field is required.' : 'Use your organization email.'}
          </span>

          <label className="input-label" htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={touched.password && !isPasswordValid ? 'input-error' : ''}
              aria-invalid={!isPasswordValid}
              aria-describedby="password-helper"
            />
          </label>
          <span id="password-helper" className="helper-text">
            {touched.password && !isPasswordValid ? 'Use at least 6 characters.' : 'Password must be strong.'}
          </span>

          <div className="row space-between">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <button type="button" className="ghost-link">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="primary-btn" disabled={!formIsValid && submitted}>
            Sign in
          </button>
          {validationSummary && <p className="validation-summary">{validationSummary}</p>}
        </form>
      </div>
      <div className="card-accent">
        <p>Need an account?</p>
        <h3>Create one in seconds.</h3>
        <span className="accent-pill">No backend required</span>
      </div>
    </section>
  );
}

export default LoginPage;
