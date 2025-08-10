import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

interface DeploymentTerminalProps {
  isDeploying?: boolean;
  deploymentStatus?: 'idle' | 'deploying' | 'success' | 'error';
  onDeploymentComplete?: (previewUrl: string) => void;
  onDeploymentError?: () => void;
}

const DeploymentTerminal: React.FC<DeploymentTerminalProps> = ({ 
  isDeploying = false, 
  deploymentStatus: externalDeploymentStatus = 'idle',
  onDeploymentComplete,
  onDeploymentError
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const [localDeploymentStatus, setLocalDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const deploymentStarted = useRef(false);
  const isDeploymentRunning = useRef(false);
  
  // Use external status if provided, otherwise use local status
  const deploymentStatus = externalDeploymentStatus !== 'idle' ? externalDeploymentStatus : localDeploymentStatus;

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize terminal without fixed size - let FitAddon handle it
    terminal.current = new Terminal({
      theme: {
        background: '#1a1a1a',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selection: 'rgba(255, 255, 255, 0.3)',
      },
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      cursorBlink: true,
      convertEol: true,
    });

    // Initialize fit addon
    fitAddon.current = new FitAddon();
    terminal.current.loadAddon(fitAddon.current);

    // Open terminal
    terminal.current.open(terminalRef.current);
    
    // Multiple attempts to fit the terminal
    const attemptFit = (attempt = 0) => {
      if (attempt > 3) {
        console.warn('Failed to fit terminal after 3 attempts');
        showWelcomeMessage();
        return;
      }
      
      setTimeout(() => {
        if (fitAddon.current && terminalRef.current && terminal.current) {
          try {
            const rect = terminalRef.current.getBoundingClientRect();
            console.log(`Attempt ${attempt + 1} - Container dimensions:`, rect.width, 'x', rect.height);
            
            if (rect.width > 0 && rect.height > 0) {
              fitAddon.current.fit();
              console.log('Terminal fitted successfully on attempt', attempt + 1);
              
              // Show welcome message after successful fit
              setTimeout(() => showWelcomeMessage(), 100);
              return;
            } else {
              console.log('Container has zero dimensions, retrying...');
              attemptFit(attempt + 1);
            }
          } catch (error) {
            console.warn('Terminal fit failed on attempt', attempt + 1, error);
            attemptFit(attempt + 1);
          }
        } else {
          attemptFit(attempt + 1);
        }
      }, 100 + (attempt * 100));
    };
    
    attemptFit();

    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (fitAddon.current && terminal.current) {
          try {
            fitAddon.current.fit();
          } catch (error) {
            console.warn('Terminal resize failed:', error);
          }
        }
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (terminal.current) {
        terminal.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!terminal.current) return;

    if (deploymentStatus === 'deploying' && !isDeploymentRunning.current) {
      isDeploymentRunning.current = true;
      deploymentStarted.current = true;
      // 延迟启动部署，让终端完全初始化
      setTimeout(() => {
        startDeployment();
      }, 500);
    } else if (deploymentStatus === 'success' && deploymentStarted.current && !isDeploymentRunning.current) {
      // If we switch back to sandbox and it's already deployed, show completion message
      showCompletionMessage();
    } else if (deploymentStatus === 'idle' && !deploymentStarted.current) {
      // Show welcome message for idle state
      showWelcomeMessage();
    }
  }, [deploymentStatus]);

  const showWelcomeMessage = () => {
    if (!terminal.current) {
      console.warn('Terminal not initialized yet');
      return;
    }

    try {
      terminal.current.clear();
      terminal.current.writeln('\x1b[36m╭─────────────────────────────────────────────────╮\x1b[0m');
      terminal.current.writeln('\x1b[36m│                 Dashboard Deployment           │\x1b[0m');
      terminal.current.writeln('\x1b[36m╰─────────────────────────────────────────────────╯\x1b[0m');
      terminal.current.writeln('');
      terminal.current.writeln('\x1b[32m✨ Ready to deploy your dashboard\x1b[0m');
      terminal.current.writeln('');
      terminal.current.writeln('\x1b[90mDeployment will start automatically...\x1b[0m');
      terminal.current.writeln('');
    } catch (error) {
      console.error('Failed to show welcome message:', error);
    }
  };

  const showCompletionMessage = () => {
    if (!terminal.current) return;

    try {
      terminal.current.clear();
      
      // Success message
      terminal.current.writeln('\x1b[32m╭─────────────────────────────────────────────────╮\x1b[0m');
      terminal.current.writeln('\x1b[32m│              🎉 Deployment Successful!         │\x1b[0m');
      terminal.current.writeln('\x1b[32m╰─────────────────────────────────────────────────╯\x1b[0m');
      terminal.current.writeln('');
      
      // Generate preview URL
      const deploymentId = Math.random().toString(36).substr(2, 8);
      const previewUrl = `https://dashboard-${deploymentId}.preview.affinedoc.com`;
      
      terminal.current.writeln('\x1b[36m🌐 Your Dashboard is now live!\x1b[0m');
      terminal.current.writeln('');
      terminal.current.writeln(`\x1b[4m\x1b[96m${previewUrl}\x1b[0m`);
      terminal.current.writeln('');
      terminal.current.writeln('\x1b[90m📊 Dashboard features:\x1b[0m');
      terminal.current.writeln('\x1b[90m   • Responsive design (Desktop/Tablet/Mobile)\x1b[0m');
      terminal.current.writeln('\x1b[90m   • Real-time statistics cards\x1b[0m');
      terminal.current.writeln('\x1b[90m   • Interactive sales charts\x1b[0m');
      terminal.current.writeln('\x1b[90m   • HeroUI theme integration\x1b[0m');
      terminal.current.writeln('');
      terminal.current.writeln('\x1b[32m✨ Ready for production use!\x1b[0m');
    } catch (error) {
      console.error('Failed to show completion message:', error);
    }
  };

  const writeWithDelay = (text: string, delay: number = 30): Promise<void> => {
    return new Promise((resolve) => {
      if (!terminal.current) {
        resolve();
        return;
      }
      
      // 直接写入整个文本，不需要逐字符动画
      terminal.current.write(text);
      setTimeout(() => {
        resolve();
      }, delay * text.length);
    });
  };

  const startDeployment = async () => {
    if (!terminal.current) return;

    setLocalDeploymentStatus('deploying');
    terminal.current.clear();
    
    // Deployment header
    terminal.current.writeln('\x1b[36m🚀 Starting Dashboard Deployment...\x1b[0m');
    terminal.current.writeln('');

    try {
      // Step 1: Initialize deployment
      await writeWithDelay('\x1b[34m[1/6]\x1b[0m Initializing deployment environment...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      terminal.current.writeln(' \x1b[32m✓\x1b[0m');
      terminal.current.writeln('');

      // Step 2: Installing dependencies
      await writeWithDelay('\x1b[34m[2/6]\x1b[0m Installing dependencies...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      terminal.current.writeln(' \x1b[32m✓\x1b[0m');
      terminal.current.writeln('\x1b[90m      📦 @heroui/react\x1b[0m');
      terminal.current.writeln('\x1b[90m      📦 recharts\x1b[0m');
      terminal.current.writeln('\x1b[90m      📦 @iconify/react\x1b[0m');
      terminal.current.writeln('');

      // Step 3: Building components
      await writeWithDelay('\x1b[34m[3/6]\x1b[0m Building React components...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      terminal.current.writeln(' \x1b[32m✓\x1b[0m');
      terminal.current.writeln('\x1b[90m      🏗️ StatsCard component\x1b[0m');
      terminal.current.writeln('\x1b[90m      🏗️ SalesChart component\x1b[0m');
      terminal.current.writeln('\x1b[90m      🏗️ HeroUIToolbar component\x1b[0m');
      terminal.current.writeln('');

      // Step 4: Optimizing assets
      await writeWithDelay('\x1b[34m[4/6]\x1b[0m Optimizing assets and themes...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      terminal.current.writeln(' \x1b[32m✓\x1b[0m');
      terminal.current.writeln('\x1b[90m      🎨 Processing HeroUI theme\x1b[0m');
      terminal.current.writeln('\x1b[90m      📱 Generating responsive layouts\x1b[0m');
      terminal.current.writeln('');

      // Step 5: Deploying to server
      await writeWithDelay('\x1b[34m[5/6]\x1b[0m Deploying to preview server...');
      await new Promise(resolve => setTimeout(resolve, 2500));
      terminal.current.writeln(' \x1b[32m✓\x1b[0m');
      terminal.current.writeln('\x1b[90m      🌐 Uploading to CDN\x1b[0m');
      terminal.current.writeln('\x1b[90m      🔧 Configuring server routes\x1b[0m');
      terminal.current.writeln('');

      // Step 6: Finalizing
      await writeWithDelay('\x1b[34m[6/6]\x1b[0m Finalizing deployment...');
      await new Promise(resolve => setTimeout(resolve, 800));
      terminal.current.writeln(' \x1b[32m✓\x1b[0m');
      terminal.current.writeln('');

      // Success message
      terminal.current.writeln('\x1b[32m╭─────────────────────────────────────────────────╮\x1b[0m');
      terminal.current.writeln('\x1b[32m│              🎉 Deployment Successful!         │\x1b[0m');
      terminal.current.writeln('\x1b[32m╰─────────────────────────────────────────────────╯\x1b[0m');
      terminal.current.writeln('');
      
      // Generate preview URL
      const deploymentId = Math.random().toString(36).substr(2, 8);
      const previewUrl = `https://dashboard-${deploymentId}.preview.affinedoc.com`;
      
      terminal.current.writeln('\x1b[36m🌐 Your Dashboard is now live!\x1b[0m');
      terminal.current.writeln('');
      terminal.current.writeln(`\x1b[4m\x1b[96m${previewUrl}\x1b[0m`);
      terminal.current.writeln('');
      terminal.current.writeln('\x1b[90m📊 Dashboard features:\x1b[0m');
      terminal.current.writeln('\x1b[90m   • Responsive design (Desktop/Tablet/Mobile)\x1b[0m');
      terminal.current.writeln('\x1b[90m   • Real-time statistics cards\x1b[0m');
      terminal.current.writeln('\x1b[90m   • Interactive sales charts\x1b[0m');
      terminal.current.writeln('\x1b[90m   • HeroUI theme integration\x1b[0m');
      terminal.current.writeln('');
      terminal.current.writeln('\x1b[32m✨ Ready for production use!\x1b[0m');

      setLocalDeploymentStatus('success');
      isDeploymentRunning.current = false;
      if (onDeploymentComplete) {
        onDeploymentComplete(previewUrl);
      }

    } catch (error) {
      terminal.current.writeln('');
      terminal.current.writeln('\x1b[31m❌ Deployment failed!\x1b[0m');
      terminal.current.writeln('\x1b[31mPlease check your configuration and try again.\x1b[0m');
      setLocalDeploymentStatus('error');
      isDeploymentRunning.current = false;
      if (onDeploymentError) {
        onDeploymentError();
      }
    }
  };

  const resetTerminal = () => {
    setLocalDeploymentStatus('idle');
    deploymentStarted.current = false;
    isDeploymentRunning.current = false;
    showWelcomeMessage();
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#1a1a1a'
      }}
    >
      <div 
        ref={terminalRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          padding: '16px',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};

export default DeploymentTerminal;