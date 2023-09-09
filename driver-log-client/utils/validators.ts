export function isValidPhoneNumber(phoneNumber: string) {
   // Regex to check valid
   // International Phone Numbers
   let regex = new RegExp(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6,15}[0-9]{1}$/);

   // matches the ReGex
   return regex.test(phoneNumber);
}

export function isValidEmail(email: string) {
   // Regular expression for a valid email address
   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
   return emailRegex.test(email);
}

export function isValidPassword(password: string) {
   // Check for at least one uppercase letter
   const hasUppercase = /[A-Z]/.test(password);

   // Check for at least one lowercase letter
   const hasLowercase = /[a-z]/.test(password);

   // Check for at least one special character
   const hasSpecialChar = /[\W_]/.test(password);

   // Check for at least one number
   const hasNumber = /\d/.test(password);

   // Check if the password length is at least 8 characters
   const hasLength = password.length >= 8;

   return hasUppercase && hasLowercase && hasSpecialChar && hasNumber && hasLength;
}
