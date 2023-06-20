export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address in invalid";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "At least 6 characters";
  } else {
    delete errors.password;
  }

  if (type === "signUp") {

    if (!data.name.trim()) {
      errors.name = "Name required";
    } else {
      delete errors.name;
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password is not match";
    } else {
      delete errors.confirmPassword;
    }
  
    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "Please read and accept our terms";
    }
  }
  return errors;
};
