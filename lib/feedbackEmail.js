// Builds the email that /g/feedback sends

// Form's three radio values
const FEEDBACK_TYPES = ["comment", "correction", "bug"];

// Textarea stops at 400 characters
const LIMITS = {
  email: 320,
  message: 1000,
  url: 2048,
  browser: 512,
};

const clamp = (value, max) => {
  if (typeof value !== "string") return "";
  if (value.length <= max) return value;
  return value.slice(0, max) + "… [truncated]";
};

const feedbackEmailBody = ({ email, type, message, url, browser, date }) =>
  [
    `Email:\n${clamp(email, LIMITS.email)}`,
    `Type:\n${type}`,
    `Message:\n${clamp(message, LIMITS.message)}`,
    `URL:\n${clamp(url, LIMITS.url)}`,
    `Date:\n${date}`,
    `Browser:\n${clamp(browser, LIMITS.browser) || "(not reported)"}`,
  ].join("\n\n");

module.exports = { FEEDBACK_TYPES, LIMITS, clamp, feedbackEmailBody };
