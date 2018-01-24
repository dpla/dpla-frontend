import { gaTrackingId } from "constants/site";
import ReactGA from "react-ga";

// Initialization will occur on the initial pageload, and also when
// switching between pages of different types.
const initGa = () => {
  if (!window.GA_INITIALIZED) {
    alert("init ga");
    ReactGA.initialize(gaTrackingId);
    window.GA_INITIALIZED = true;
  }
};

export default initGa;
