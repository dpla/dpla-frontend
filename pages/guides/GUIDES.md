# Guides

The Guides section (`/guides`) is a collection of audience-specific how-to pages that help different types of users discover what they can do with DPLA. Each guide has an index card on the listing page and a full detail page.

## Routes

| URL | File |
|-----|------|
| `/guides` | `pages/guides/index.js` |
| `/guides/[guideSlug]` | `pages/guides/[guideSlug].js` |

Both pages are server-side rendered — content is fetched from WordPress on every request.

## Where Content Is Managed

All guide content lives in **WordPress** (`dpla.wpengine.com/wp-admin`):

### Page content
Each guide is a standard WordPress **Page** with the following ACF custom fields:

| Field | Used on |
|-------|---------|
| `summary` | Index page card (short description) |
| `display_title` | Index page card |
| `color` | Index page card styling |
| `illustration` | Index page card image |
| `banner_image` | Guide detail page header |

The main body text is the standard WordPress page content field.

### Menu structure
The guides index and individual guides are wired up via the **"About Us" menu** in WordPress (`Appearance → Menus → About Us`). The hierarchy matters:

```
How Can I Use DPLA?   ← parent item (maps to /guides index)
  ├── Education Guide
  ├── Family Research
  ├── Lifelong Learning
  ├── Scholarly Research
  └── For Developers
```

- The **parent item** (`How Can I Use DPLA?`) is identified by comparing its URL to the `guides_endpoint` value in the WordPress site settings ACF field.
- **Child items** of that parent are rendered as guide cards on the index and as individual guide pages.
- The `post_name` (slug) of each child menu item becomes the URL path: `/guides/[post_name]`.

## How to Add a New Guide

1. **Create a WordPress page** under `Pages → Add New`:
   - Write the body content in the main editor
   - Fill in the ACF fields: `summary`, `display_title`, `color`, `illustration`, `banner_image`

2. **Add it to the About Us menu** (`Appearance → Menus → About Us`):
   - Find the new page in the "Add menu items" panel
   - Add it as a **child of "How Can I Use DPLA?"**
   - Save the menu

The new guide will appear automatically on the `/guides` listing page and be accessible at `/guides/[its-slug]`. No code changes are required.

## Current Guides

| Title | Slug | WP Page ID | Summary |
|-------|------|------------|---------|
| The Education Guide to DPLA | `the-education-guide-to-dpla` | 2392 | Educators and students explore our Primary Source Sets to discover history and culture through primary sources and ideas for classroom use. |
| The Family Research Guide to DPLA | `the-family-research-guide-to-dpla` | 2393 | Genealogists use our search tools to find free materials for their family history research projects. |
| The Guide to Lifelong Learning with DPLA | `the-guide-to-lifelong-learning-with-dpla` | 2402 | Lifelong learners enjoy browsing by topic and viewing Online Exhibitions to learn more about their interests. |
| The Scholarly Research Guide to DPLA | `the-scholarly-research-guide-to-dpla` | 2403 | Scholarly researchers use DPLA to find open access sources from archives across the country through a single portal. |
| DPLA Developer Resources | `for-developers` | 5459 | Developers use DPLA's API and rich dataset to discover hidden treasures and craft unique online experiences. |
