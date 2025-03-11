// Utility function to sanitize user input and prevent NoSQL injection
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  let sanitized = input.trim().replace(/[$.]/g, "");
  return sanitized.replace(/^"(.*)"$/, "$1");
};

module.exports = { sanitizeInput };
