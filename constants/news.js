export const TITLE = "DPLA News";
export const DESCRIPTION =
  "Announcements, project updates, and content highlights from our staff and community.";
export const ANNOUNCEMENTS_TAG_ID = 151; // in WP: wp_terms.name == announcements
export const CONTENT_SHOWCASE_TAG_ID = 268; // in WP: wp_terms.name == Content Showcase
// from the WP DB wp_terms table:
export const NEWS_TAGS = [
  { id: 78, name: "Ebooks" }, // there's also 221 but has no posts
  { id: 271, name: "Events" },
  { id: 140, name: "Community Reps" },
  { id: 151, name: "Announcements" },
  { id: 152, name: "Education" },
  { id: 180, name: "Technology" },
  { id: 268, name: "Content Showcase" },
  { id: 269, name: "Grant Projects" },
  { id: 270, name: "Hubs Network" }
];
