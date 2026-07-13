export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

export function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char] ?? char);
}

export function sanitizeString(
  input: string,
  maxLength: number = 500
): string {
  const stripped = stripHtmlTags(input);
  const normalized = stripped
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return normalized.slice(0, maxLength);
}

export function sanitizeName(name: string): string {
  return sanitizeString(name, 80);
}

export function sanitizeMessage(message: string): string {
  return sanitizeString(message, 500);
}
