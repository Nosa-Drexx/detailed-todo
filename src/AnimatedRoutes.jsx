import { Routes, Route, useLocation } from "react-router-dom";
import App from "./pages/App";
import Body from "./pages/Body";
import MoreDetails from "./pages/MoreDetails";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Body />}>
          <Route index element={<App />} />
          <Route path="/MoreDetails/:id" element={<MoreDetails />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
