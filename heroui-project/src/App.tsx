import React from 'react';
import { HeroUIProvider } from "@heroui/react";
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <HeroUIProvider>
      <Dashboard />
    </HeroUIProvider>
  );
};

export default App;