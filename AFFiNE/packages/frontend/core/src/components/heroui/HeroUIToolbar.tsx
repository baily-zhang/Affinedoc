import React, { useState } from 'react';
import { Icon } from "@iconify/react";

interface HeroUIToolbarProps {
  activeView?: 'preview' | 'code' | 'sandbox';
  onActiveViewChange?: (view: 'preview' | 'code' | 'sandbox') => void;
}

const HeroUIToolbar: React.FC<HeroUIToolbarProps> = ({ 
  activeView: controlledActiveView, 
  onActiveViewChange 
}) => {
  const [internalActiveView, setInternalActiveView] = useState<'preview' | 'code' | 'sandbox'>('preview');
  
  const activeView = controlledActiveView ?? internalActiveView;
  const setActiveView = (view: 'preview' | 'code' | 'sandbox') => {
    if (onActiveViewChange) {
      onActiveViewChange(view);
    } else {
      setInternalActiveView(view);
    }
  };
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="flex items-center justify-between bg-white border-b px-4 py-2">
      {/* 左侧：Preview/Code/Sandbox 切换 */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setActiveView('preview')}
          className={`px-3 py-1.5 text-sm rounded-md flex items-center space-x-2 ${
            activeView === 'preview' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Icon icon="lucide:eye" width={16} height={16} />
          <span>Preview</span>
        </button>
        
        <button
          onClick={() => setActiveView('code')}
          className={`px-3 py-1.5 text-sm rounded-md flex items-center space-x-2 ${
            activeView === 'code' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Icon icon="lucide:code" width={16} height={16} />
          <span>Code</span>
        </button>
        
        <button
          onClick={() => setActiveView('sandbox')}
          className={`px-3 py-1.5 text-sm rounded-md flex items-center space-x-2 ${
            activeView === 'sandbox' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Icon icon="lucide:terminal" width={16} height={16} />
          <span>Sandbox</span>
        </button>
      </div>

      {/* 右侧：设备切换 + 分享按钮 */}
      <div className="flex items-center space-x-3">
        {/* 设备切换 */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`p-2 rounded-md ${
              activeDevice === 'desktop' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            title="Desktop View"
          >
            <Icon icon="lucide:monitor" width={18} height={18} />
          </button>
          
          <button
            onClick={() => setActiveDevice('tablet')}
            className={`p-2 rounded-md ${
              activeDevice === 'tablet' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            title="Tablet View"
          >
            <Icon icon="lucide:tablet" width={18} height={18} />
          </button>
          
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`p-2 rounded-md ${
              activeDevice === 'mobile' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            title="Mobile View"
          >
            <Icon icon="lucide:smartphone" width={18} height={18} />
          </button>
        </div>

        {/* 分隔线 */}
        <div className="h-6 w-px bg-gray-300"></div>

        {/* 分享按钮 */}
        <button
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md flex items-center space-x-2 hover:bg-blue-700"
          title="Share"
        >
          <Icon icon="lucide:share" width={16} height={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default HeroUIToolbar;