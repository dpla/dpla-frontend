import { gaTrackingId } from "constants/env";
import ReactGA from "react-ga";

// Initialization will occur on the initial pageload, and also when
// switching between pages of different types.
const initGa = () => {
  if (!window.GA_INITIALIZED) {
    ReactGA.initialize(gaTrackingId, { titleCase: false });
    window.GA_INITIALIZED = true;
  }
};

export default initGa;
