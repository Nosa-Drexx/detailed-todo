import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
function Body() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Outlet />
    </motion.div>
  );
}
export default Body;
