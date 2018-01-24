import { gaTrackingId } from "constants/site";
import ReactGA from "react-ga";

const initGa = () => {
  if (!window.GA_INITIALIZED) {
    ReactGA.initialize(gaTrackingId);
    window.GA_INITIALIZED = true;
  }
};

export default initGa;
