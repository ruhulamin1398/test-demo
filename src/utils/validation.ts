export const validateLogin = (
  email: string,
  password: string
): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  return errors;
};

export const validateRegistration = (
  email: string,
  password: string,
  confirmPassword: string
): Record<string, string> => {
  const errors: Record<string, string> = validateLogin(email, password);
  if (!confirmPassword) errors.confirmPassword = "Confirm Password is required";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  return errors;
};
