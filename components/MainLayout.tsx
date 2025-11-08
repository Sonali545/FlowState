import React, { useState, useContext, useCallback, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Editor from './Editor';
import KanbanBoard from './KanbanBoard';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Toast from './Toast';
import DevTools from './DevTools';
import AdminPanel from './AdminPanel';
import Chat from './Chat';
import { AppContext, NavigationTarget, View } from '../App';
// FIX: Import ToastData type to resolve 'Cannot find name' error.
import type { Page, ToastData } from '../types';
import NewPageModal from './NewPageModal';
import NewProjectModal from './NewProjectModal';
import { importMarkdownFile } from '../utils/import';
import ThemeSwitcher from './ThemeSwitcher';


interface MainLayoutProps {
  navigationTarget: NavigationTarget;
}

const MainLayout: React.FC<MainLayoutProps> = ({ navigationTarget }) => {
  const context = useContext(AppContext);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [activePage, setActivePage] = useState<Page | undefined>();
  const [isNewPageModalOpen, setIsNewPageModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);


  useEffect(() => {
    if (!context) return;
    
    const { view, pageId } = navigationTarget;
    setActiveView(view);
    
    if (view === 'editor' && pageId) {
        let foundPage: Page | undefined;
        const findPage = (pages: Page[]): Page | undefined => {
            for (const p of pages) {
                if (p.id === pageId) return p;
                if (p.children) {
                    const childResult = findPage(p.children);
                    if (childResult) return childResult;
                }
            }
            return undefined;
        }
        
        for (const project of context.projects) {
            foundPage = findPage(project.pages);
            if (foundPage) break;
        }

        setActivePage(foundPage);
    } else if (view !== 'editor') {
        setActivePage(undefined);
    }
  }, [navigationTarget, context]);
  
  const handleViewChange = useCallback((view: View) => {
    context?.navigateTo({ view });
  }, [context]);

  const handleSelectPage = useCallback((page: Page) => {
    context?.navigateTo({ view: 'editor', pageId: page.id });
  }, [context]);
  
  const handleNewPageRequest = useCallback(() => {
    setIsNewPageModalOpen(true);
  }, []);
  
  const handleImportMarkdown = useCallback(() => {
    if (context) {
        importMarkdownFile(context.createPage);
    }
  }, [context]);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { toasts, removeToast } = context;

  const renderActiveView = () => {
    switch(activeView) {
        case 'dashboard': return <Dashboard />;
        case 'editor': return activePage ? <Editor key={activePage.id} page={activePage} /> : <div className="text-center text-secondary">Select a page to start editing.</div>;
        case 'kanban': return <KanbanBoard />;
        case 'leaderboard': return <Leaderboard />;
        case 'admin': return <AdminPanel />;
        default: return <Dashboard />;
    }
  }

  return (
    <div className="flex h-screen bg-primary">
      <Sidebar 
        activeView={activeView}
        onViewChange={handleViewChange}
        onSelectPage={handleSelectPage}
        activePageId={activePage?.id}
        onNewPage={handleNewPageRequest}
        onNewProject={() => setIsNewProjectModalOpen(true)}
        onImportMarkdown={handleImportMarkdown}
        onOpenThemeSwitcher={() => setIsThemeSwitcherOpen(true)}
      />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header onToggleChat={() => setIsChatVisible(!isChatVisible)} />
        <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-secondary">
          <div id="printable-area" className="relative">
            {renderActiveView()}
          </div>
        </main>
        
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <DevTools />
        {isNewPageModalOpen && <NewPageModal onClose={() => setIsNewPageModalOpen(false)} />}
        {isNewProjectModalOpen && <NewProjectModal onClose={() => setIsNewProjectModalOpen(false)} />}
        {isThemeSwitcherOpen && <ThemeSwitcher onClose={() => setIsThemeSwitcherOpen(false)} />}
        <Chat isVisible={isChatVisible} onClose={() => setIsChatVisible(false)} />
      </div>
    </div>
  );
};

const ToastContainer: React.FC<{ toasts: ToastData[], removeToast: (id: number) => void }> = ({ toasts, removeToast }) => (
    <div className="absolute top-20 right-6 space-y-2 z-50">
        {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
    </div>
);


export default MainLayout;
