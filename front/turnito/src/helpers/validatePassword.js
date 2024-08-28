export const validatePassword = (password) => {
  const requirements = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  };

  requirements.length = password.length >= 8;
  requirements.uppercase = /[A-Z]/.test(password);
  requirements.lowercase = /[a-z]/.test(password);
  requirements.number = /\d/.test(password);
  requirements.specialChar = /[!@#$%^&*]/.test(password);
};
