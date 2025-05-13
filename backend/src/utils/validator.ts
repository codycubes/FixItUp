/**
 * Validator utility functions
 */

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Validate password strength (min 6 characters, at least 1 number)
export const isStrongPassword = (password: string): boolean => {
  return password.length >= 6 && /\d/.test(password);
};

// Check if object has required fields
export const hasRequiredFields = <T>(
  obj: Partial<T>,
  requiredFields: (keyof T)[]
): boolean => {
  return requiredFields.every((field) => 
    obj[field] !== undefined && obj[field] !== null && obj[field] !== ''
  );
};

// Sanitize user input by removing dangerous characters
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}; 