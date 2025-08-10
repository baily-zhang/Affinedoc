import React, { useState, useEffect } from 'react';
import { HeroUIProvider } from '@heroui/react';
import StatsCard from './StatsCard';
import SalesChart from './SalesChart';
import HeroUIToolbar from './HeroUIToolbar';
import CodeMirrorEditor from './CodeMirrorEditor';
import FileTree from './FileTree';
import DeploymentTerminal from './DeploymentTerminal';
import { loadFileContent, getFileLanguage } from './FileLoader';
import './VSCodeTheme.css';

const AffineHeroDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'preview' | 'code' | 'sandbox'>('preview');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedFile, setSelectedFile] = useState<string | null>('src/components/heroui/AffineHeroDashboard.tsx');
  const [codeContent, setCodeContent] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<'javascript' | 'typescript' | 'css' | 'html' | 'json'>('typescript');
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [hasInitializedDeployment, setHasInitializedDeployment] = useState(false);

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

  // Auto-start deployment when first switching to sandbox view
  useEffect(() => {
    if (activeView === 'sandbox' && !hasInitializedDeployment && deploymentStatus === 'idle') {
      setHasInitializedDeployment(true);
      // Small delay to ensure terminal is mounted
      setTimeout(() => {
        setDeploymentStatus('deploying');
      }, 100);
    }
  }, [activeView, hasInitializedDeployment, deploymentStatus]);

  const getDeviceContainerStyle = () => {
    const baseStyle = {
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out'
    };

    switch (activeDevice) {
      case 'desktop':
        return {
          ...baseStyle,
          width: '100%',
          maxWidth: '1200px',
          height: 'auto',
          minHeight: '700px'
        };
      case 'tablet':
        return {
          ...baseStyle,
          width: '768px',
          height: '1024px',
          maxHeight: '80vh'
        };
      case 'mobile':
        return {
          ...baseStyle,
          width: '375px',
          height: '667px',
          maxHeight: '70vh'
        };
      default:
        return baseStyle;
    }
  };

  const getDashboardContentClasses = () => {
    switch (activeDevice) {
      case 'desktop':
        return "px-4 sm:px-6 lg:px-8 py-8";
      case 'tablet':
        return "px-4 py-6";
      case 'mobile':
        return "px-3 py-4";
      default:
        return "px-4 sm:px-6 lg:px-8 py-8";
    }
  };

  const getGridClasses = () => {
    switch (activeDevice) {
      case 'desktop':
        return {
          stats: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
          charts: "grid grid-cols-1 lg:grid-cols-2 gap-4"
        };
      case 'tablet':
        return {
          stats: "grid grid-cols-2 gap-3 mb-6",
          charts: "grid grid-cols-1 gap-4"
        };
      case 'mobile':
        return {
          stats: "grid grid-cols-1 gap-3 mb-6",
          charts: "grid grid-cols-1 gap-4"
        };
      default:
        return {
          stats: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
          charts: "grid grid-cols-1 lg:grid-cols-2 gap-4"
        };
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'preview':
        const gridClasses = getGridClasses();
        return (
          <div className="h-full overflow-y-auto bg-gray-100 py-8">
            <div style={getDeviceContainerStyle()}>
              <div className={getDashboardContentClasses()}>
                <h1 className={`font-semibold text-foreground mb-4 ${
                  activeDevice === 'mobile' ? 'text-xl' : 
                  activeDevice === 'tablet' ? 'text-xl' : 'text-2xl'
                }`}>Dashboard</h1>
                <div className={gridClasses.stats}>
                  <StatsCard title="Total Revenue" value="$45,231" change={20.1} icon="lucide:dollar-sign" />
                  <StatsCard title="Active Users" value="1,234" change={12.5} icon="lucide:users" />
                  <StatsCard title="New Orders" value="450" change={-3.4} icon="lucide:shopping-cart" />
                  <StatsCard title="Conversion Rate" value="2.4%" change={4.1} icon="lucide:percent" />
                </div>
                <div className={gridClasses.charts}>
                  <SalesChart />
                  <div className="bg-content1 p-4 rounded-lg shadow">
                    <h2 className={`font-semibold mb-2 ${
                      activeDevice === 'mobile' ? 'text-base' : 'text-lg'
                    }`}>Additional Widget</h2>
                    <p className={activeDevice === 'mobile' ? 'text-sm' : ''}>
                      Place for another chart or data visualization
                    </p>
                  </div>
                </div>
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
                  height="100%"
                />
              </div>
            </div>
          </div>
        );
      case 'sandbox':
        return (
          <div className="h-full w-full" style={{ height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
            <DeploymentTerminal 
              isDeploying={deploymentStatus === 'deploying'}
              deploymentStatus={deploymentStatus}
              onDeploymentComplete={() => setDeploymentStatus('success')}
              onDeploymentError={() => setDeploymentStatus('error')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <HeroUIProvider>
      <div className="w-full h-screen flex flex-col" data-heroui="true">
        <HeroUIToolbar 
          activeView={activeView} 
          onActiveViewChange={setActiveView}
          activeDevice={activeDevice}
          onActiveDeviceChange={setActiveDevice}
        />
        <main className="flex-1 bg-background" style={{ height: 'calc(100vh - 60px)', overflow: 'hidden', position: 'relative' }}>
          {renderContent()}
        </main>
      </div>
    </HeroUIProvider>
  );
};

export default AffineHeroDashboard;