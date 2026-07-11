export function cleanString(str: string): string {
  // Replace multiple whitespace characters (including newlines) with a single space
  const noExtraSpaces = str.replace(/\s+/g, " ");

  // Trim the string to remove leading and trailing spaces
  return noExtraSpaces.trim();
}
