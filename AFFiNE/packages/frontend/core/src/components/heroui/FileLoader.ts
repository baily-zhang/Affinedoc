// File content mapping for the heroui project files
export const fileContents: Record<string, string> = {
  'src/components/heroui/AffineHeroDashboard.tsx': `import React, { useState } from 'react';
import { HeroUIProvider } from '@heroui/react';
import StatsCard from './StatsCard';
import SalesChart from './SalesChart';
import HeroUIToolbar from './HeroUIToolbar';
import CodeMirrorEditor from './CodeMirrorEditor';

const AffineHeroDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'preview' | 'code' | 'sandbox'>('preview');
  const [codeContent, setCodeContent] = useState(\`// Welcome to the Code Editor
// This is a sample React component

import React from 'react';

const SampleComponent: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Hello World!</h1>
      <p>This is a sample component</p>
    </div>
  );
};

export default SampleComponent;\`);

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
          <div className="h-full p-4">
            <CodeMirrorEditor
              value={codeContent}
              onChange={setCodeContent}
              language="typescript"
              theme="dark"
              height="calc(100vh - 120px)"
            />
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

export default AffineHeroDashboard;`,

  'src/components/heroui/HeroUIToolbar.tsx': `import React, { useState } from 'react';
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
          className={\`px-3 py-1.5 text-sm rounded-md flex items-center space-x-2 \${
            activeView === 'preview' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }\`}
        >
          <Icon icon="lucide:eye" width={16} height={16} />
          <span>Preview</span>
        </button>
        
        <button
          onClick={() => setActiveView('code')}
          className={\`px-3 py-1.5 text-sm rounded-md flex items-center space-x-2 \${
            activeView === 'code' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }\`}
        >
          <Icon icon="lucide:code" width={16} height={16} />
          <span>Code</span>
        </button>
        
        <button
          onClick={() => setActiveView('sandbox')}
          className={\`px-3 py-1.5 text-sm rounded-md flex items-center space-x-2 \${
            activeView === 'sandbox' 
              ? 'bg-gray-100 text-gray-900' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }\`}
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
            className={\`p-2 rounded-md \${
              activeDevice === 'desktop' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }\`}
            title="Desktop View"
          >
            <Icon icon="lucide:monitor" width={18} height={18} />
          </button>
          
          <button
            onClick={() => setActiveDevice('tablet')}
            className={\`p-2 rounded-md \${
              activeDevice === 'tablet' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }\`}
            title="Tablet View"
          >
            <Icon icon="lucide:tablet" width={18} height={18} />
          </button>
          
          <button
            onClick={() => setActiveDevice('mobile')}
            className={\`p-2 rounded-md \${
              activeDevice === 'mobile' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }\`}
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

export default HeroUIToolbar;`,

  'src/components/heroui/CodeMirrorEditor.tsx': `import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, indentOnInput, indentUnit } from '@codemirror/language';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeMirrorEditorProps {
  value?: string;
  language?: 'javascript' | 'typescript' | 'css' | 'html' | 'json';
  theme?: 'light' | 'dark';
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

const getLanguageExtension = (language: string) => {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return javascript();
    case 'css':
      return css();
    case 'html':
      return html();
    case 'json':
      return json();
    default:
      return javascript();
  }
};

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  value = '',
  language = 'javascript',
  theme = 'dark',
  onChange,
  readOnly = false,
  height = '400px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      lineNumbers(),
      history(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      indentUnit.of('  '),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      getLanguageExtension(language),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onChange) {
          onChange(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        '&': {
          height: height,
          fontSize: '14px',
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
        },
        '.cm-content': {
          padding: '12px',
          minHeight: '100%',
          color: theme === 'dark' ? '#d4d4d4' : '#333333'
        },
        '.cm-focused': {
          outline: 'none'
        },
        '.cm-editor': {
          borderRadius: '8px',
          border: theme === 'dark' ? '1px solid #404040' : '1px solid #e2e8f0',
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
        },
        '.cm-gutters': {
          backgroundColor: theme === 'dark' ? '#252526' : '#f5f5f5',
          color: theme === 'dark' ? '#858585' : '#666666',
          border: 'none'
        }
      })
    ];

    if (theme === 'dark') {
      extensions.push(oneDark);
    }

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    const initialState = EditorState.create({
      doc: value,
      extensions
    });

    const view = new EditorView({
      state: initialState,
      parent: editorRef.current
    });

    viewRef.current = view;
    setIsReady(true);

    return () => {
      view.destroy();
      viewRef.current = null;
      setIsReady(false);
    };
  }, [language, theme, readOnly, height]);

  useEffect(() => {
    if (!viewRef.current || !isReady) return;

    const currentValue = viewRef.current.state.doc.toString();
    if (value !== currentValue) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value
        }
      });
      viewRef.current.dispatch(transaction);
    }
  }, [value, isReady]);

  return (
    <div className="w-full">
      <div ref={editorRef} className="w-full" />
    </div>
  );
};

export default CodeMirrorEditor;`,

  'src/components/heroui/StatsCard.tsx': `import React from 'react';
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
      <div className={\`flex items-center mt-2 \${changeColor}\`}>
        <Icon icon={changeIcon} width={16} height={16} />
        <span className="ml-1 text-small">
          {Math.abs(change).toFixed(1)}% from last month
        </span>
      </div>
    </div>
  );
};

export default StatsCard;`,

  'src/components/heroui/SalesChart.tsx': `import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
];

const SalesChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#006FEE" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;`,

  'src/components/heroui/dashboard-styles.css': `/* Dashboard styles for HeroUI integration */

/* Reset AFFiNE background for dashboard area */
.affine-page-viewport {
  background: rgb(248 250 252) !important;
}

/* Success/Danger colors for change indicators */
.text-success {
  color: rgb(34 197 94) !important;
}

.text-danger {
  color: rgb(239 68 68) !important;
}

/* Background colors */
.bg-content2 {
  background-color: rgb(244 244 245) !important;
}

.bg-background {
  background-color: rgb(248 250 252) !important;
}

.bg-content1 {
  background-color: rgb(255 255 255) !important;
}

/* Text colors and sizes */
.text-default-500 {
  color: rgb(115 115 115) !important;
}

.text-small {
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
}

.text-foreground {
  color: rgb(0 0 0) !important;
}

/* Enhanced Card styles and other styles... */
/* (Truncated for brevity but includes all CSS content) */`
};

// Function to get file language from extension
export const getFileLanguage = (filePath: string): 'javascript' | 'typescript' | 'css' | 'html' | 'json' => {
  const extension = filePath.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'tsx':
    case 'ts':
      return 'typescript';
    case 'jsx':
    case 'js':
      return 'javascript';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'html':
    case 'htm':
      return 'html';
    default:
      return 'typescript';
  }
};

// Function to load file content (simulated for now)
export const loadFileContent = async (filePath: string): Promise<string> => {
  // In a real implementation, this would make an API call to read the file
  // For now, we'll return some sample content based on the file type
  
  switch (filePath) {
    case 'package.json':
      return JSON.stringify({
        "name": "@affine/core",
        "version": "0.22.4",
        "dependencies": {
          "@codemirror/autocomplete": "^6.18.6",
          "@codemirror/commands": "^6.8.1",
          "@heroui/react": "^2.8.2",
          "react": "19.1.0"
        }
      }, null, 2);
      
    case 'tailwind.config.js':
      return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [],
}`;

    case 'src/components/heroui/package.json':
      return fileContents[filePath] || '// File content will be loaded here';
      
    default:
      // Return actual file content if available, otherwise placeholder
      return fileContents[filePath] || getPlaceholderContent(filePath);
  }
};

// Get placeholder content based on file type
const getPlaceholderContent = (filePath: string): string => {
  const fileName = filePath.split('/').pop() || '';
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'tsx':
      return `import React from 'react';

const ${fileName.replace('.tsx', '')}: React.FC = () => {
  return (
    <div>
      {/* ${fileName} component */}
    </div>
  );
};

export default ${fileName.replace('.tsx', '')};`;
      
    case 'ts':
      return `// ${fileName}
export const example = () => {
  console.log('Hello from ${fileName}');
};`;
      
    case 'css':
      return `/* ${fileName} */
.container {
  /* Add your styles here */
}`;
      
    case 'json':
      return `{
  "name": "${fileName}",
  "version": "1.0.0"
}`;
      
    default:
      return `// ${fileName}
// File content will be loaded here`;
  }
};