import React, { useState, useEffect } from 'react';
import { HeroUIProvider } from '@heroui/react';
import StatsCard from './StatsCard';
import SalesChart from './SalesChart';
import HeroUIToolbar from './HeroUIToolbar';
import CodeMirrorEditor from './CodeMirrorEditor';
import FileTree from './FileTree';
import { loadFileContent, getFileLanguage } from './FileLoader';
import './VSCodeTheme.css';

const AffineHeroDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'preview' | 'code' | 'sandbox'>('preview');
  const [selectedFile, setSelectedFile] = useState<string | null>('src/components/heroui/AffineHeroDashboard.tsx');
  const [codeContent, setCodeContent] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<'javascript' | 'typescript' | 'css' | 'html' | 'json'>('typescript');

  const handleFileSelect = async (filePath: string) => {
    setSelectedFile(filePath);
    const content = await loadFileContent(filePath);
    const language = getFileLanguage(filePath);
    setCodeContent(content);
    setCurrentLanguage(language);
  };

  useEffect(() => {
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }, [selectedFile]);

  const renderContent = () => {
    switch (activeView) {
      case 'preview':
        return (
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
        );
      case 'code':
        return (
          <div className="flex h-full code-view-container">
            {/* File Explorer Sidebar */}
            <div className="w-80 border-r file-tree-container" style={{ borderColor: '#3c3c3c', backgroundColor: '#1e1e1e' }}>
              <FileTree 
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </div>
            
            {/* Code Editor Area */}
            <div className="flex-1 flex flex-col">
              {/* Tab Bar */}
              {selectedFile && (
                <div 
                  className="border-b px-4 py-2 flex items-center editor-tab-bar" 
                  style={{ backgroundColor: '#2d2d30', borderColor: '#3c3c3c' }}
                >
                  <span className="text-sm" style={{ color: '#cccccc' }}>
                    {selectedFile.split('/').pop()}
                  </span>
                </div>
              )}
              
              {/* Editor */}
              <div className="flex-1 code-editor-container">
                <CodeMirrorEditor
                  value={codeContent}
                  onChange={setCodeContent}
                  language={currentLanguage}
                  theme="dark"
                  height="calc(100vh - 160px)"
                />
              </div>
            </div>
          </div>
        );
      case 'sandbox':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Sandbox</h1>
            <div className="bg-content1 p-8 rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold mb-2">Sandbox View</h2>
              <p>This is where the sandbox/terminal functionality will be implemented</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <HeroUIProvider>
      <div className="flex-1 flex flex-col overflow-hidden" data-heroui="true">
        <HeroUIToolbar 
          activeView={activeView} 
          onActiveViewChange={setActiveView} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          {renderContent()}
        </main>
      </div>
    </HeroUIProvider>
  );
};

export default AffineHeroDashboard;