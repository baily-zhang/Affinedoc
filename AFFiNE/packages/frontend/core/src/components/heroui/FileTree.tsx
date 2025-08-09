import React, { useState } from 'react';
import { Icon } from "@iconify/react";

interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

interface FileTreeProps {
  onFileSelect: (filePath: string) => void;
  selectedFile: string | null;
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'tsx':
    case 'ts':
      return 'vscode-icons:file-type-typescript-official';
    case 'jsx':
    case 'js':
      return 'vscode-icons:file-type-js-official';
    case 'css':
      return 'vscode-icons:file-type-css';
    case 'json':
      return 'vscode-icons:file-type-json';
    case 'md':
      return 'vscode-icons:file-type-markdown';
    case 'config':
      return 'vscode-icons:file-type-config';
    default:
      return 'vscode-icons:default-file';
  }
};

const fileStructure: FileItem[] = [
  {
    name: 'src',
    path: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        path: 'src/components',
        type: 'folder',
        children: [
          {
            name: 'heroui',
            path: 'src/components/heroui',
            type: 'folder',
            children: [
              { name: 'AffineHeroDashboard.tsx', path: 'src/components/heroui/AffineHeroDashboard.tsx', type: 'file' },
              { name: 'CodeMirrorEditor.tsx', path: 'src/components/heroui/CodeMirrorEditor.tsx', type: 'file' },
              { name: 'Dashboard.tsx', path: 'src/components/heroui/Dashboard.tsx', type: 'file' },
              { name: 'Header.tsx', path: 'src/components/heroui/Header.tsx', type: 'file' },
              { name: 'HeroUIToolbar.tsx', path: 'src/components/heroui/HeroUIToolbar.tsx', type: 'file' },
              { name: 'SalesChart.tsx', path: 'src/components/heroui/SalesChart.tsx', type: 'file' },
              { name: 'SidebarNavigation.tsx', path: 'src/components/heroui/SidebarNavigation.tsx', type: 'file' },
              { name: 'StatsCard.tsx', path: 'src/components/heroui/StatsCard.tsx', type: 'file' },
              { name: 'dashboard-styles.css', path: 'src/components/heroui/dashboard-styles.css', type: 'file' },
              { name: 'index.css', path: 'src/components/heroui/index.css', type: 'file' },
            ]
          }
        ]
      }
    ]
  },
  { name: 'package.json', path: 'package.json', type: 'file' },
  { name: 'tailwind.config.js', path: 'tailwind.config.js', type: 'file' },
];

const FileTreeItem: React.FC<{
  item: FileItem;
  level: number;
  onFileSelect: (filePath: string) => void;
  selectedFile: string | null;
}> = ({ item, level, onFileSelect, selectedFile }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(item.path);
    }
  };

  const isSelected = selectedFile === item.path;

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 cursor-pointer rounded ${
          isSelected ? 'bg-blue-600' : ''
        }`}
        style={{ 
          paddingLeft: `${level * 16 + 8}px`,
          backgroundColor: isSelected ? '#0078d4' : 'transparent',
          color: '#cccccc'
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = '#2d2d30';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
        onClick={handleClick}
      >
        {item.type === 'folder' && (
          <Icon
            icon={isExpanded ? 'lucide:chevron-down' : 'lucide:chevron-right'}
            width={16}
            height={16}
            className="mr-1"
            style={{ color: '#858585' }}
          />
        )}
        <Icon
          icon={
            item.type === 'folder'
              ? isExpanded
                ? 'vscode-icons:default-folder-opened'
                : 'vscode-icons:default-folder'
              : getFileIcon(item.name)
          }
          width={16}
          height={16}
          className="mr-2"
        />
        <span className="text-sm" style={{ color: isSelected ? '#ffffff' : '#cccccc' }}>{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.path}
              item={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree: React.FC<FileTreeProps> = ({ onFileSelect, selectedFile }) => {
  return (
    <div className="bg-gray-800 text-gray-200 p-2 h-full overflow-y-auto" style={{ backgroundColor: '#1e1e1e', color: '#cccccc' }}>
      <div className="text-xs uppercase mb-2 px-2" style={{ color: '#6c6c6c' }}>Explorer</div>
      {fileStructure.map((item) => (
        <FileTreeItem
          key={item.path}
          item={item}
          level={0}
          onFileSelect={onFileSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
};

export default FileTree;