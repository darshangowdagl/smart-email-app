import { motion } from "framer-motion";
import "./Hero.css";

function HeroContent() {
  return (
    <>
      <motion.div
        className="content mt-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-text mt-10">
          <motion.h2
            className="text-2xl font-semibold mb-2 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to
          </motion.h2>
          <motion.h1
            className="text-5xl font-semibold text-red-500 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            NEUROMAIL
          </motion.h1>
          <motion.h2
            className="text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            A Smart Email App!
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-10 max-w-lg mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Experience a smarter way to manage your emails with our AI-powered assistant. Get instant summaries, AI-generated reply suggestions, and automatic email categorization to stay organized effortlessly. Boost productivity with intelligent email management! 
          </motion.p>

          <motion.p
            className="text-gray-600 mb-10 max-w-lg mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Made with love ❤️
          </motion.p>

          <motion.button
            className="get-started-btn mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Started</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

export default HeroContent;
