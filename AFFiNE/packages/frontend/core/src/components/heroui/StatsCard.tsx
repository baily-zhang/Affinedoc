import React from 'react';
import { Icon } from "@iconify/react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "text-success" : "text-danger";
  const changeIcon = isPositive ? "lucide:trending-up" : "lucide:trending-down";

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-small text-default-500">{title}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
        </div>
        <div className="bg-content2 p-2 rounded-full">
          <Icon icon={icon} width={24} height={24} />
        </div>
      </div>
      <div className={`flex items-center mt-2 ${changeColor}`}>
        <Icon icon={changeIcon} width={16} height={16} />
        <span className="ml-1 text-small">
          {Math.abs(change).toFixed(1)}% from last month
        </span>
      </div>
    </div>
  );
};

export default StatsCard;