import { motion } from "framer-motion";
import "./Hero.css"

export const HeroImage = () => {
    return (
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src="/Images/Hero_Image.png" 
            alt="Person working with email" 
            className="image-1"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          <motion.img 
            src="/Images/Blurred_BG.png" 
            alt="Background decoration" 
            className="image-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </motion.div>
    )
} 