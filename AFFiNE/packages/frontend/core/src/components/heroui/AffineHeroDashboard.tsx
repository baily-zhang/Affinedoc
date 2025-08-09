import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import StatsCard from './StatsCard';
import SalesChart from './SalesChart';
import HeroUIToolbar from './HeroUIToolbar';

const AffineHeroDashboard: React.FC = () => {
  return (
    <HeroUIProvider>
      <div className="flex-1 flex flex-col overflow-hidden" data-heroui="true">
        <HeroUIToolbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard title="Total Revenue" value="$45,231" change={20.1} icon="lucide:dollar-sign" />
            <StatsCard title="Active Users" value="1,234" change={12.5} icon="lucide:users" />
            <StatsCard title="New Orders" value="450" change={-3.4} icon="lucide:shopping-cart" />
            <StatsCard title="Conversion Rate" value="2.4%" change={4.1} icon="lucide:percent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesChart />
            <div className="bg-content1 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Additional Widget</h2>
              <p>Place for another chart or data visualization</p>
            </div>
            </div>
          </div>
        </main>
      </div>
    </HeroUIProvider>
  );
};

export default AffineHeroDashboard;