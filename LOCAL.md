# Configuring a new DPLA Local instance

These are the main areas relevant to any Local instance:

- Environment Variables
- Static File Folder
- CSS Theme
- Local Constants File

## Environment Variables

- `SITE_ENV` is the variable that determines if the instance is a Local, if it has a value of `local`. This variable also needs to be set up in `constants/env.js`.

- `LOCAL_ID` determines what Local will be loaded in the given instance, since all Locals share the same codebase. Each Local must have a descriptive and unique ID (with no spaces, for example: `wisconsin` for Recollection Wisconsin). This variable also needs to be set up in `constants/env.js`.

## Static File Folder

Static files belonging to each Local need to be placed in a subfolder of the `public/static/local` folder. The subfolder needs to be named with the `LOCAL_ID` (for example `public/static/local/wisconsin/` for Recollection Wisconsin). Files that go in this folder are:

- Local favicon file displayed in browser tabs (filename defined in the Constants file below)
- Local logo file displayed in the header and footer (filename defined in the Constants file below)
- `about.md` containing the text for the about page
- `homepage.md` containing the text for the home page
- `terms.md` containing the text for the terms and conditions page
- Hero image shown on the home page (filename configured via the `background` field in the Constants file below)
- `manifest.json` with a manifest of files

## CSS Theme

Locals use a theming system that allows basic color customization. This customization must follow [WCAG contrast and color requirements](https://webaim.org/articles/contrast/). Theme files follow a similar structure as the static file folder above but in the `stylesheets/themes/` folder and contain a single `theme.css` file (for example `stylesheets/themes/wisconsin/theme.css` for Recollection Wisconsin). The file itself contains the necessary color customizations for the Local.

## Local Constants File

Since all Local instances share the same codebase, there is a [`constants/local.js`](constants/local.js) file that contains the necessary configuration variables for an instance:

- `theme`: identifier used as the theme key/class at runtime (should preferably be the same as the `LOCAL_ID` for consistency)
- `name`: name of the Local, appearing throughout the site
- `favicon`: filename for the Local's favicon displayed in browser tabs
- `logo`: filename for the Local's logo shown in header and footer
- `heroLogo`: filename for a larger logo variant shown in the hero section (optional)
- `background`: filename for the hero image shown on the home page
- `description`: used in the `description` metadata field, sometimes displayed by search engines in their results
- `filters`: array of URL-encoded filter strings used to restrict search results to this Local's content (for example `[“provider.@id:http%3A//dp.la/api/contributor/wisconsin”]` for Recollection Wisconsin); use `tags` instead when filtering by tag
- `tags`: array of tag strings used to restrict search results to this Local's content (alternative to `filters` for tag-based locals, for example `[“aviation”]`)
- `locationFacet`: URL-encoded value used to restrict the search interface results to items with the specified `sourceResource.spatial.name` (for example `%22Wisconsin%22` for Recollection Wisconsin)
- `subjectFacet`: URL-encoded value used to restrict the search interface results to items with the specified `sourceResource.subject.name` (for example `%22Wisconsin%22` for Recollection Wisconsin)
- `externalLink`: URL for the top navigation link with the Local's `name` (optional)
- `hasAbout`: determines whether to show (`true`) or not (`false`) the “About” link in the hero section on the homepage under the search box
- `hasSidebar`: determines whether to show (`true`) or not (`false`) a sidebar in the search results
- `hasBrowseByPartner`: determines whether to show (`true`) or not (`false`) the “Browse by Partner” section
- `hasBrowseAll`: determines whether to show (`true`) or not (`false`) the “Browse All” section
- `hasTerms`: determines whether to show (`true`) or not (`false`) the terms and conditions page
- `hasContact`: determines whether to show (`true`) or not (`false`) a contact link (optional)
- `contactLink`: URL for the contact page (optional)
- `routes`: object defining the Local's content pages and navigation structure (optional)
