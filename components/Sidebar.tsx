import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import type { Page } from '../types';
import { ChevronDownIcon, DocumentIcon, KanbanIcon, PlusIcon, DashboardIcon, LeaderboardIcon, ShieldCheckIcon, ArrowUpTrayIcon, PaletteIcon, MusicalNoteIcon } from './icons';
import type { View } from '../App';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  onSelectPage: (page: Page) => void;
  onNewPage: () => void;
  onNewProject: () => void;
  onImportMarkdown: () => void;
  onOpenThemeSwitcher: () => void;
  activePageId?: string;
}

const PageTreeItem: React.FC<{
  page: Page;
  onSelectPage: (page: Page) => void;
  level: number;
  activePageId?: string;
}> = ({ page, onSelectPage, level, activePageId }) => {

  const [isExpanded, setIsExpanded] = useState(true);
  const context = useContext(AppContext);
  const hasChildren = page.children && page.children.length > 0;
  const isActive = page.id === activePageId;

  const activeClasses = `bg-accent text-accent`;
  const inactiveClasses = 'hover:bg-hover';

  return (
    <div>
      <div 
        onClick={() => onSelectPage(page)}
        className={`flex items-center p-2 rounded-md cursor-pointer group ${isActive ? activeClasses : inactiveClasses}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren && (
          <ChevronDownIcon 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} 
            className={`w-4 h-4 mr-2 transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
          />
        )}
        {!hasChildren && <div className="w-4 h-4 mr-2"></div>}
        <DocumentIcon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-accent' : 'text-secondary'}`} />
        <span className="truncate text-sm font-medium">{page.title}</span>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {page.children?.map(child => (
            <PageTreeItem key={child.id} page={child} onSelectPage={onSelectPage} level={level + 1} activePageId={activePageId} />
          ))}
        </div>
      )}
    </div>
  );
};

const SoundToggle: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { isSoundEnabled, toggleSound } = context;
    return (
        <button onClick={toggleSound} title="Toggle Ambient Sound" className={`w-full flex items-center gap-3 p-2 rounded-md cursor-pointer text-sm hover:bg-hover ${isSoundEnabled ? 'text-accent' : 'text-secondary'}`}>
            <MusicalNoteIcon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-primary">Ambient Sound</span>
            <div className={`ml-auto w-10 h-5 rounded-full p-0.5 transition-colors ${isSoundEnabled ? 'bg-accent' : 'bg-gray-300'}`}>
                 <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isSoundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </button>
    );
}


const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onSelectPage, onNewPage, onNewProject, onImportMarkdown, onOpenThemeSwitcher, activePageId }) => {
  const context = useContext(AppContext);

  if (!context) return null;

  const { currentUser, projects, activeProject, setActiveProject, isReadOnly } = context;
  
  const NavItem: React.FC<{ view: View, icon: React.ReactNode, label: string }> = ({ view, icon, label }) => (
     <div 
        onClick={() => onViewChange(view)}
        className={`flex items-center p-2 rounded-md cursor-pointer ${activeView === view ? `bg-accent text-accent` : 'hover:bg-hover'}`}
    >
        {icon}
        <span className="font-medium text-sm">{label}</span>
    </div>
  );
  
  const canSeeAdmin = currentUser.role === 'Admin' || currentUser.role === 'Owner';

  return (
    <aside className="w-64 bg-primary border-r border-primary flex flex-col p-3 no-print">
      <div className="flex items-center gap-3 p-2 mb-4">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-9 h-9 rounded-full" />
        <div className="truncate">
          <p className="font-semibold text-sm text-primary">{currentUser.name}'s Workspace</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center px-2 mb-2">
            <p className="text-xs font-semibold text-secondary uppercase">Projects</p>
            {!isReadOnly && (
                <button onClick={onNewProject} title="New Project" className="text-secondary hover:text-primary p-1 rounded-full hover:bg-hover">
                    <PlusIcon className="w-4 h-4"/>
                </button>
            )}
        </div>
        {projects.map(project => (
          <div key={project.id} onClick={() => setActiveProject(project)} className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${project.id === activeProject.id ? 'bg-accent text-accent' : 'hover:bg-hover'}`}>
            <img src={project.iconUrl} alt={project.name} className="w-6 h-6 rounded-md" />
            <span className={`font-semibold text-sm ${project.id === activeProject.id ? 'text-accent' : 'text-primary'}`}>{project.name}</span>
          </div>
        ))}
      </div>
      
      <nav className="flex-1 space-y-1 overflow-y-auto">
        <NavItem view="dashboard" icon={<DashboardIcon className="w-5 h-5 mr-3 flex-shrink-0 text-secondary" />} label="Dashboard" />
        <NavItem view="kanban" icon={<KanbanIcon className="w-5 h-5 mr-3 flex-shrink-0 text-secondary" />} label="Kanban Board" />
        <NavItem view="leaderboard" icon={<LeaderboardIcon className="w-5 h-5 mr-3 flex-shrink-0 text-secondary" />} label="Leaderboard" />
        {canSeeAdmin && <NavItem view="admin" icon={<ShieldCheckIcon className="w-5 h-5 mr-3 flex-shrink-0 text-secondary" />} label="Admin Panel" />}

        <div className="pt-2">
           <div className="flex justify-between items-center px-2 mb-2">
             <p className="text-xs font-semibold text-secondary uppercase">Pages</p>
             {!isReadOnly && (
                <button onClick={onNewPage} className="text-secondary hover:text-primary">
                    <PlusIcon className="w-4 h-4"/>
                </button>
             )}
           </div>
          {activeProject.pages.filter(p => !p.parentId).map(page => (
            <PageTreeItem key={page.id} page={page} onSelectPage={onSelectPage} level={0} activePageId={activePageId} />
          ))}
        </div>
      </nav>
      
      <div className="pt-2 mt-auto border-t border-primary space-y-1">
          {!isReadOnly && (
               <button onClick={onImportMarkdown} className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer text-sm text-primary hover:bg-hover">
                   <ArrowUpTrayIcon className="w-5 h-5 flex-shrink-0 text-secondary" />
                   <span className="font-medium">Import Markdown</span>
               </button>
          )}
          <button onClick={onOpenThemeSwitcher} className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer text-sm text-primary hover:bg-hover">
              <PaletteIcon className="w-5 h-5 flex-shrink-0 text-secondary" />
              <span className="font-medium">Appearance</span>
          </button>
          <SoundToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
