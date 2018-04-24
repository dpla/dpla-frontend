export const TITLE = "Primary Source Sets";
export const DESCRIPTION = `Primary source collections exploring topics in
history, literature, and culture developed by educators — complete with
teaching guides for class use.`;

export const sortOptions = [
  { value: "recently_added", label: "Recently Added" },
  { value: "chronology_asc", label: "Chronology, oldest first" },
  { value: "chronology_desc", label: "Chronology, most recent first" }
];

export const subjectOptions = [
  { value: "all-subjects", label: "All Subjects" },
  { value: "us-history", label: "US History" },
  { value: "american-literature", label: "American Literature" },
  { value: "science-and-technology", label: "Science and Technology" },
  { value: "world-history", label: "World History" },
  { value: "arts", label: "Arts" },
  { value: "african-american-experience", label: "African Americans" },
  { value: "asian-americans", label: "Asian Americans" },
  { value: "labor-history", label: "Labor History" },
  { value: "latino-americans", label: "Latino Americans" },
  { value: "law-government", label: "Law and Government" },
  { value: "migration", label: "Migration" },
  { value: "native-americans", label: "Native Americans" },
  { value: "cultural-movements", label: "Social Movements" },
  { value: "women", label: "Women" }
];

export const mapSubjectNameToSlug = subject =>
  ({
    "All Subjects": "all-subjects",
    "US History": "us-history",
    "American Literature": "american-literature",
    "Science and Technology": "science-and-technology",
    "World History": "world-history",
    Arts: "arts",
    "African Americans": "african-american-experience",
    "Asian Americans": "asian-americans",
    "Labor History": "labor-history",
    "Latino Americans": "latino-americans",
    "Law and Government": "law-government",
    Migration: "migration",
    "Native Americans": "native-americans",
    "Social Movements": "cultural-movements",
    Women: "women"
  }[subject]);

export const timePeriodOptions = [
  { value: "all-time-periods", label: "All Time Periods" },
  {
    value: "three-worlds-meet-beginnings-to-1620",
    label: "Three Worlds Meet (Beginnings to 1620)"
  },
  {
    value: "colonization-and-settlement-1585-1763",
    label: "Colonization and Settlement (1585-1763)"
  },
  {
    value: "revolution-and-the-new-nation-1754-1820s",
    label: "Revolution and the New Nation (1754-1820s)"
  },
  {
    value: "expansion-and-reform-1801-1861",
    label: "Expansion and Reform (1801-1861)"
  },
  {
    value: "civil-war-and-reconstruction-1850-1877",
    label: "Civil War and Reconstruction (1850-1877)"
  },
  {
    value: "the-development-of-the-industrial-united-states-1870-1900",
    label: "The Development of the Industrial United States (1870-1900)"
  },
  {
    value: "the-emergence-of-modern-america-1890-1930",
    label: "The Emergence of Modern America (1890-1930)"
  },
  {
    value: "the-great-depression-and-world-war-ii-1929-1945",
    label: "The Great Depression and World War II (1929-1945)"
  },
  {
    value: "postwar-united-states-1945-to-early-1970s",
    label: "Postwar United States (1945 to early 1970s)"
  },
  {
    value: "contemporary-united-states-1968-to-the-present",
    label: "Contemporary United States (1968 to the present)"
  }
];

export const mapTimePeriodNameToSlug = timePeriod =>
  ({
    "All Time Periods": "all-time-periods",
    "Three Worlds Meet (Beginnings to 1620)":
      "three-worlds-meet-beginnings-to-1620",
    "Colonization and Settlement (1585-1763)":
      "colonization-and-settlement-1585-1763",
    "Revolution and the New Nation (1754-1820s)":
      "revolution-and-the-new-nation-1754-1820s",
    "Expansion and Reform (1801-1861)": "expansion-and-reform-1801-1861",
    "Civil War and Reconstruction (1850-1877)":
      "civil-war-and-reconstruction-1850-1877",
    "The Development of the Industrial United States (1870-1900)":
      "the-development-of-the-industrial-united-states-1870-1900",
    "The Emergence of Modern America (1890-1930)":
      "the-emergence-of-modern-america-1890-1930",
    "The Great Depression and World War II (1929-1945)":
      "the-great-depression-and-world-war-ii-1929-1945",
    "Postwar United States (1945 to early 1970s)":
      "postwar-united-states-1945-to-early-1970s",
    "Contemporary United States (1968 to the present)":
      "contemporary-united-states-1968-to-the-present"
  }[timePeriod]);
