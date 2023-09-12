export function isValidPhoneNumber(phoneNumber: string) {
  // Regex to check valid
  // International Phone Numbers
  const regex = new RegExp(/^[+]{1}(?:[0-9-()/.\s]){6,15}[0-9]$/);

  // matches the ReGex
  return regex.test(phoneNumber);
}

export function isValidEmail(email: string) {
  // Regular expression for a valid email address
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}
