import { ViewBody, ViewHeader } from '@affine/core/modules/workbench';
import React from 'react';

import AffineHeroDashboard from '../../components/heroui/AffineHeroDashboard';

const HeroDashboardPage: React.FC = () => {
  return (
    <>
      <ViewHeader>
        <div className="flex items-center justify-between w-full px-6 py-4">
          <h1 className="text-xl font-semibold text-foreground">HeroUI Dashboard</h1>
        </div>
      </ViewHeader>
      <ViewBody>
        <AffineHeroDashboard />
      </ViewBody>
    </>
  );
};

export const Component = HeroDashboardPage;