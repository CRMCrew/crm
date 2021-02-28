import React from 'react';
import { motion } from 'framer-motion';

const errorVariant = {
  hidden: {
    scale: 0.1,
    opacity: 0.1,
  },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const Error = ({ error }) => {
  return (
    <motion.div
      className='danger p-2 w-250 textCenter font-2'
      variants={errorVariant}
      initial='hidden'
      animate='visible'
    >
      {error}
    </motion.div>
  );
};

<div className='bg-warning p-2 w-200 textCenter'>mauvais mot de passe</div>;

export default Error;
