/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation, Tab } from './components/Navigation';
import { ClimateIntelligence } from './components/ClimateIntelligence';
import { VisionScanner } from './components/VisionScanner';
import { MarketHub } from './components/MarketHub';
import { Profile } from './components/Profile';
import { VoiceAssistant } from './components/VoiceAssistant';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<Tab>('climate');

  const renderContent = () => {
    switch (activeTab) {
      case 'climate':
        return <ClimateIntelligence />;
      case 'vision':
        return <VisionScanner />;
      case 'market':
        return <MarketHub />;
      case 'profile':
        return <Profile />;
      default:
        return <ClimateIntelligence />;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <VoiceAssistant />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
