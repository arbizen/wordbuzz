export function getUsername(email) {
  // Using a regular expression to match the username part of the email
  const usernameMatch = email.match(/^([a-zA-Z0-9]+)@/);

  // Check if a match is found
  if (usernameMatch && usernameMatch.length > 1) {
    // Extracted username is at index 1
    return usernameMatch[1];
  } else {
    // If no match is found, return null or handle accordingly
    return "guest";
  }
}
