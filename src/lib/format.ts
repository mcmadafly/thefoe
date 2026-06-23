/** Shared formatting helpers. */

const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // Frontmatter dates are authored as plain YYYY-MM-DD (parsed as UTC midnight).
  // Format in UTC so they don't slip a day in negative-offset timezones.
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return DATE_FMT.format(date);
}

/** Rough reading-time estimate from a body string (~220 wpm). */
export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
