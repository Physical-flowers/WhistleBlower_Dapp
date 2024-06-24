// pages/index.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadForm from '../components/UploadForm';
import DocumentList from '../components/DocumentList';
import { Header } from '../components/Header';

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <motion.div
        initial={{ marginLeft: 0 }}
        animate={{ marginLeft: isSidebarOpen ? '16rem' : 0 }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="relative"
      >
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-col items-center justify-center pt-16">
          <UploadForm />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? '0%' : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 left-0 w-64 h-full bg-gray-100 z-20 shadow-lg"
      >
        <DocumentList />
      </motion.div>
    </div>
  );
};

export default Home;
