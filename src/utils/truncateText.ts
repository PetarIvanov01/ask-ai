export function truncateText(
  str: string,
  maxLength = 17,
  suffix = "..."
): string {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + suffix;
  }
  return str;
}
