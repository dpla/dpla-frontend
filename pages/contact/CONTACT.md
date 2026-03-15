# Contact Page

`/contact` is a single static-layout page that renders an interactive contact form and a table of supplementary contact methods. Content and layout are hardcoded in the component files — there is no CMS integration.

## Routes

| URL | File |
|-----|------|
| `/contact` | `pages/contact/index.js` |

## How the Page Works

The page is **server-side rendered** (`getServerSideProps`), but only to fetch the About Us (or Pro site) menu for the sidebar — the page content itself is entirely static.

### Contact Form (`ContactForm`)

The form (`components/ContactComponents/ContactForm/index.js`) collects:

| Field | Type | Notes |
|-------|------|-------|
| Your name | text input | Required |
| Your email | email input | Required |
| Your message | textarea | Required |
| Subject | dropdown | Required — see options below |
| `i_prefer_usps_mail` | hidden checkbox | Honeypot anti-spam field — submissions with this set to `1` are silently rejected |

On submit, the form POSTs JSON to **`/g/contact`**, a custom Express route defined in `server.js` (not a Next.js API route). That handler:

1. Rejects the request if the honeypot field is set.
2. Sends the email to `info@dp.la` with the subject line `DPLA Site Contact: {subject}`.
4. Returns HTTP 200 on success; the form displays a "Thank you!" confirmation.

### Subject Options (hardcoded in `ContactForm`)

- General inquiry
- Item usage and rights
- Hubs and adding new content to DPLA
- Report a problem with the website
- Report an error with our data
- Report an accessibility issue
- API, bulk data, and developer-related questions
- App Library submission
- Education and Primary Source Sets
- Press inquiry

To add or change subject options, edit the `selectOptions` array in `components/ContactComponents/ContactForm/index.js`.

### More Ways to Contact (`MoreWaysToContact`)

Below the form, `components/ContactComponents/MoreWaysToContact/index.js` renders a hardcoded table of contact methods:

| Method | Value |
|--------|-------|
| General Email | info@dp.la |
| Telephone | 888-444-0612 |
| Mailing Address | 1 Washington Mall #1019, Boston, MA 02108 |
| Social Media | Twitter, Facebook, Instagram, YouTube |
| Mailing Lists | General, Education, Genealogy (Mailchimp) |

To update any of these, edit that component directly.

## Sidebar

The sidebar is populated from the WordPress **About Us menu** (user site) or **Pro Site menu** (pro site), fetched server-side. `contact-us` is hardcoded as the active sidebar item ID. Contact is not itself a WP menu item — the active state simply highlights the Contact entry if it exists in the menu, otherwise no item appears highlighted.

## Where to Edit Things

| What | Where |
|------|-------|
| Page title | `constants/contact.js` — `TITLE` constant |
| Form subject options | `components/ContactComponents/ContactForm/index.js` — `selectOptions` array |
| Email routing logic | `server.js` — `doContact()` function |
| Contact details table (phone, email, address, socials, lists) | `components/ContactComponents/MoreWaysToContact/index.js` |
| Form layout/styles | `components/ContactComponents/ContactForm/ContactForm.module.scss` |
