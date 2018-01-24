import trackGaEvent from "./trackGaEvent";
import ReactGA from "react-ga";

/**
  * @param gaEvent
  * @param links
  */

const bindLinkEvent = (gaEvent, links) => {
  Array.from(links).forEach(function(link) {
    link.addEventListener("click", function() {
      event.preventDefault();
      trackGaEvent(gaEvent);
      window.open(this.href, "_blank");
    });
  });
};

export default bindLinkEvent;
