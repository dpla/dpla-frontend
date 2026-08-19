import gtag from "./gtag";

// Click and middle-click tracking; navigation stays native.
// auxclick: button 1 = middle-click; Safari fires it only from 18.2.
// Right-click opens a menu, not the link — untrackable.
export const trackLinkClicks = (gaEvent) => ({
  onClick: () => gtag.event(gaEvent),
  onAuxClick: (e) => {
    if (e.button === 1) gtag.event(gaEvent);
  },
});

// Props for tracked external links.
// No "noreferrer": partners need the referrer.
const clickThroughLinkProps = (gaEvent) => ({
  target: "_blank",
  rel: "noopener",
  ...trackLinkClicks(gaEvent),
});

export default clickThroughLinkProps;
