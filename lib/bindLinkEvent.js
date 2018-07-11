import * as gtag from "lib/gtag";

/**
  * Bind a Google Analytics event to one or more DOM links.
  *
  * @param gaEvent with the following properties:
  *   type:        Type of event, e.g. "View Item" or "Click Through"
  *   itemId:      ID of the DPLA item
  *   title:       Title of the DPLA item
  *   partner:     Name of the partner/hub 
  *   contributor: Name of the dataProvider
  *
  * @param links Array of DOM link elements
  */

const bindLinkEvent = (gaEvent, links, windowName = "_blank") => {
  Array.from(links).forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      gtag.event(gaEvent);
      window.open(this.href, windowName);
    });
  });
};

export default bindLinkEvent;
