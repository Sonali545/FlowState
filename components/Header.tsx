import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../App';
import { SearchIcon, BellIcon, LogoutIcon, TrophyIcon, ChatBubbleLeftRightIcon } from './icons';
import GlobalSearch from './GlobalSearch';
import NotificationsPanel from './NotificationsPanel';

interface HeaderProps {
    onToggleChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleChat }) => {
  const context = useContext(AppContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    const handleKeyDown = (event: KeyboardEvent) => {
        if((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            setIsSearchOpen(true);
        }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  if (!context) return null;

  const { activeProject, currentUser, logout, markMentionsAsRead } = context;

  const xpForNextLevel = currentUser.level * 100;
  const currentLevelXp = (currentUser.level - 1) * 100;
  const xpProgress = ((currentUser.xp - currentLevelXp) / (xpForNextLevel - currentLevelXp)) * 100;

  const unreadMentionsCount = currentUser.mentions.filter(m => !m.read).length;

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(prev => !prev);
    if (!isNotificationsOpen && unreadMentionsCount > 0) {
        markMentionsAsRead();
    }
  }

  return (
    <>
      <header className="flex-shrink-0 bg-primary border-b border-primary no-print">
        <div className="flex items-center justify-between p-4 h-16">
          <div className="flex items-center gap-4">
            <button onClick={logout} className="text-lg font-bold text-primary hover:opacity-80 transition-opacity">
                FlowState
            </button>
            <div className="w-px h-6 bg-border-primary hidden sm:block"></div>
            <h1 className="text-lg font-semibold text-primary hidden sm:block">{activeProject.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
                <div 
                    className="w-full bg-secondary border border-transparent rounded-lg py-2 pl-10 pr-4 text-sm text-secondary cursor-pointer flex justify-between items-center"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <span>Search anything...</span>
                    <kbd className="font-sans text-xs font-semibold text-secondary border border-primary rounded px-1.5 py-0.5">Ctrl K</kbd>
                </div>
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            </div>

            <button onClick={onToggleChat} className="p-2 rounded-full hover:bg-hover text-secondary hover:text-primary">
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
            </button>
            
            <div className="relative" ref={notificationsRef}>
                <button onClick={handleNotificationsToggle} className="relative p-2 rounded-full hover:bg-hover text-secondary hover:text-primary">
                  <BellIcon className="w-6 h-6" />
                  {unreadMentionsCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                  )}
                </button>
                {isNotificationsOpen && <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />}
            </div>
            
            <div className="w-px h-6 bg-border-primary"></div>

            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-9 h-9 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-primary">{currentUser.name}</p>
                  <div className="flex items-center gap-1">
                      <TrophyIcon className="w-3 h-3 text-yellow-500"/>
                      <p className="text-xs text-secondary">Lvl {currentUser.level} - {currentUser.title}</p>
                  </div>
                </div>
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-primary rounded-lg shadow-lg border border-primary z-10">
                  <div className="p-3 border-b border-primary">
                      <p className="text-sm font-medium text-primary">XP: {currentUser.xp} / {xpForNextLevel}</p>
                      <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                          <div className="bg-accent h-1.5 rounded-full" style={{width: `${xpProgress}%`}}></div>
                      </div>
                  </div>
                  <div className="p-1">
                       <button onClick={logout} className="w-full flex justify-between items-center px-3 py-2 text-sm text-red-600 hover:bg-hover rounded-md">
                          <span>Logout</span>
                          <LogoutIcon className="w-5 h-5"/>
                      </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {isSearchOpen && <GlobalSearch onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};

export default Header;