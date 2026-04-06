import React from 'react';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
