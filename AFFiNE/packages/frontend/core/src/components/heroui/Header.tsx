import React from 'react';
import { Input, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";

const Header: React.FC = () => {
  return (
    <header className="bg-content1 border-b border-divider">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search..."
            startContent={<Icon icon="lucide:search" width={18} height={18} />}
          />
        </div>
        <div className="flex items-center">
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                src="https://img.heroui.chat/image/avatar?w=40&h=40&u=1"
                size="sm"
                className="cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem key="profile">Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="logout" color="danger">Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;