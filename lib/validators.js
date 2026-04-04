const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignup({ name, email, password, role }) {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Enter your full name (at least 2 characters).";
  }
  if (!email || !EMAIL_RE.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (role !== "admin" && role !== "viewer") {
    errors.role = "Choose a role.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email || !EMAIL_RE.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!password || password.length < 1) {
    errors.password = "Password is required.";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
