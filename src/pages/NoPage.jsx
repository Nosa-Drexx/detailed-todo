import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="NoPageLogo">
        <Link to="/">
          <div className="NoLogo"></div>
        </Link>
      </div>
      <div className="Nopage">
        <div>
          <h1>404</h1>
          <p>You are trying to load a page that doesn't exist</p>
        </div>
      </div>
    </motion.div>
  );
}
export default NoPage;
