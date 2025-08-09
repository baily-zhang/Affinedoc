import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const SidebarNavigation: React.FC = () => {
  const navItems = [
    { icon: "lucide:layout-dashboard", label: "Dashboard" },
    { icon: "lucide:bar-chart", label: "Analytics" },
    { icon: "lucide:users", label: "Customers" },
    { icon: "lucide:shopping-cart", label: "Orders" },
    { icon: "lucide:settings", label: "Settings" },
  ];

  return (
    <aside className="bg-content1 w-64 hidden md:flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
      </div>
      <nav className="flex-1 px-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="flat"
            color="default"
            startContent={<Icon icon={item.icon} width={20} height={20} />}
            className="justify-start mb-2 w-full"
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNavigation;