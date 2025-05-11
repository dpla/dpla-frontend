export const TITLE = "DPLA News";
export const DESCRIPTION =
  "Announcements, project updates, and content highlights from our staff and community.";
export const ANNOUNCEMENTS_TAG_ID = 151; // in WP: wp_terms.name == announcements
export const CONTENT_SHOWCASE_TAG_ID = 268; // in WP: wp_terms.name == Content Showcase
export const EBOOKS_TAG_ID = 78; // in WP: wp_terms.name == Ebooks
// from the WP DB wp_terms table:
export const NEWS_TAGS = [
  { id: 78, name: "Ebooks", slug: "ebooks" }, // there's also 221 but has no posts
  { id: 271, name: "Events", slug: "events" },
  { id: 140, name: "Community Reps", slug: "community-reps" },
  { id: 151, name: "Announcements", slug: "announcements" },
  { id: 152, name: "Education", slug: "education" },
  { id: 180, name: "Technology", slug: "technology" },
  { id: 268, name: "Content Showcase", slug: "content-showcase" },
  { id: 269, name: "Grant Projects", slug: "grant-projects" },
  { id: 270, name: "Hub Network", slug: "hub-network" },
];
