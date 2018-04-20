import ReactGA from "react-ga";

/**
  * Tracks a single Google Analtyics event.
  * @param gaEvent JSON Object with the following properties:
  *   type:        Type of event, e.g. "View Item" or "Click Through"
  *   itemId:      ID of the DPLA item
  *   title:       Title of the DPLA item
  *   partner:     Name of the partner/hub 
  *   contributor: Name of the dataProvider
  */
const trackGaEvent = gaEvent => {
  ReactGA.event({
    category: `${gaEvent.type} : ${gaEvent.partner}`,
    action: `${gaEvent.contributor}`,
    label: `${gaEvent.itemId} : ${gaEvent.title}`
  });
};

export default trackGaEvent;
