# Donate Pages

`/donate` is a two-page donation flow that collects a gift amount and frequency, then redirects the user to PayPal to complete the transaction. Content is **hardcoded in the component** — there is no CMS integration.

## Routes

| URL | File | Purpose |
|-----|------|---------|
| `/donate` | `pages/donate/index.js` | Donation form and pitch copy |
| `/donate/thank-you` | `pages/donate/thank-you.js` | Post-payment confirmation page |

## How the Donation Flow Works

1. The user visits `/donate` and sees the `DonateForm` component alongside static pitch copy.
2. They select a **frequency** (Give Once or Monthly) and an **amount** ($10 / $25 / $50 / $75 / $100, or a custom amount typed in).
3. On clicking "Donate", the form constructs a PayPal checkout URL from templates in `constants/site.js` and sets `document.location` to navigate the user to PayPal:
   - **One-time**: `PAYPAL_DONATE_SINGLE` — uses PayPal's `_donations` command
   - **Monthly**: `PAYPAL_DONATE_MONTHLY` — uses PayPal's `_xclick-subscriptions` command (monthly recurring, billed to `info@dp.la`)
4. Both URLs include a `return` parameter pointing to `/donate/thank-you`, so PayPal redirects the user back after a successful payment.
5. `/donate/thank-you` renders a static confirmation message and links to `www.paypal.com/us` for the receipt.

The form validates that the amount is a positive finite number before navigating. The PayPal URL is also validated — navigation is only performed if the constructed URL begins with `https://www.paypal.com/`.

## Where to Edit Things

| What | Where |
|------|-------|
| SEO page title | `constants/donate.js` — `SEO_TITLE` constant |
| PayPal destination account / URL templates | `constants/site.js` — `PAYPAL_DONATE_SINGLE` and `PAYPAL_DONATE_MONTHLY` |
| Donation frequency options | `components/DonateComponents/DonateForm/index.js` — `frequencyMap` array |
| Preset donation amounts | `components/DonateComponents/DonateForm/index.js` — `amountMap` array |
| Pitch copy (headline, bullet points, sidebar text) | `pages/donate/index.js` — hardcoded JSX |
| Mailing address | `pages/donate/index.js` — hardcoded JSX |
| Thank-you page copy | `pages/donate/thank-you.js` — hardcoded JSX |
| Page styles | `stylesheets/donate.module.scss` |

## Hardcoded Content on the Donate Page

The following content lives directly in `pages/donate/index.js` and must be edited in code:

- **Headline**: "Thank you for supporting DPLA"
- **Intro text**: nonprofit/tax-deductible statement
- **"Or donate by mail"** section with mailing address: 1 Washington Mall #1019, Boston, MA 02108
- **"How will DPLA use your donation?"** sidebar with bullet points about DPLA's mission
- The **e-reader image** (`/static/images/read.jpg`) used as the sidebar visual

## No CMS Integration

Neither `/donate` nor `/donate/thank-you` fetches anything from WordPress. All content is static JSX. There is no `getServerSideProps` on either page — they are rendered at request time as pure React with no external data dependencies.
