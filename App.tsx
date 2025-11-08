



import React, { useState, useCallback, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import MainLayout from './components/MainLayout';
import { mockUsers, mockProjects, badges as allBadges, pageTemplates, THEMES } from './constants';
import type { User, Project, Badge, ToastData, Page, SearchResult, ChatMessage, Reaction, StickyNote, Theme, KanbanCard } from './types';

export type View = 'dashboard' | 'editor' | 'kanban' | 'leaderboard' | 'admin';

export interface NavigationTarget {
    view: View;
    pageId?: string;
    cardId?: string; // TBD: Implement highlighting card
}

export interface AppContextType {
  users: User[];
  currentUser: User;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  activeProject: Project;
  setActiveProject: (project: Project) => void;
  addXp: (userId: string, amount: number, message?: string) => void;
  logout: () => void;
  toasts: ToastData[];
  removeToast: (id: number) => void;
  onTaskCompleted: (userId: string) => void;
  search: (query: string) => SearchResult[];
  navigateTo: (target: NavigationTarget) => void;
  createPage: (title: string, content: string, parentId?: string) => void;
  createProject: (name: string) => void;
  isReadOnly: boolean;
  updateUserRole: (userId: string, role: User['role']) => void;
  addChatMessage: (text: string) => void;
  addReactionToCard: (columnId: string, cardId: string, emoji: string) => void;
  markMentionsAsRead: () => void;
  addWebhookToast: (message: string) => void;
  addStickyNote: (pageId: string, note: Omit<StickyNote, 'id'>) => void;
  updateStickyNote: (pageId: string, noteId: string, updates: Partial<StickyNote>) => void;
  
  // Kanban functions
  addKanbanCard: (columnId: string, title: string) => void;
  updateKanbanCard: (columnId: string, cardId: string, updates: Partial<Omit<KanbanCard, 'id'>>) => void;
  moveKanbanCard: (cardId: string, fromColumnId: string, toColumnId: string) => void;

  // Theme and Ambiance
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
  customThemes: Theme[];
  saveCustomTheme: (theme: Theme) => void;
  setPreviewTheme: (theme: Theme | null) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

export const AppContext = React.createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [isAppLaunched, setIsAppLaunched] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  // Refactor: Use activeProjectId and derive activeProject to prevent stale state.
  const [activeProjectId, setActiveProjectId] = useState<string>(mockProjects[0].id);
  const activeProject = projects.find(p => p.id === activeProjectId)!;
  
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [navigationTarget, setNavigationTarget] = useState<NavigationTarget>({ view: 'dashboard' });
  const [currentUser, setCurrentUser] = useState<User>(users.find(u => u.id === 'user-1')!);

  // --- THEME & AMBIANCE STATE ---
  const [activeTheme, setActiveThemeState] = useState<Theme>(THEMES[0]);
  const [customThemes, setCustomThemes] = useState<Theme[]>([]);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load settings from localStorage on initial mount
  useEffect(() => {
    try {
        const savedThemeId = localStorage.getItem('flowstate-theme-id') || 'light';
        const savedCustomThemes = JSON.parse(localStorage.getItem('flowstate-custom-themes') || '[]');
        const savedSoundPref = localStorage.getItem('flowstate-sound-enabled') === 'true';

        setCustomThemes(savedCustomThemes);
        const allThemes = [...THEMES, ...savedCustomThemes];
        const savedTheme = allThemes.find(t => t.id === savedThemeId) || THEMES[0];
        
        setActiveThemeState(savedTheme);
        setIsSoundEnabled(savedSoundPref);
    } catch (error) {
        // FIX: The caught error `error` is of type `unknown` and must be converted to a string to be logged.
        console.error(`Failed to load user preferences from localStorage: ${String(error)}`);
        setActiveThemeState(THEMES[0]);
    }
  }, []);

  const setActiveTheme = (theme: Theme) => {
    setActiveThemeState(theme);
    localStorage.setItem('flowstate-theme-id', theme.id);
  };
  
  const saveCustomTheme = (theme: Theme) => {
    setCustomThemes(prev => {
        const existingIndex = prev.findIndex(t => t.id === theme.id);
        const newThemes = [...prev];
        if (existingIndex > -1) {
            newThemes[existingIndex] = theme;
        } else {
            newThemes.push(theme);
        }
        localStorage.setItem('flowstate-custom-themes', JSON.stringify(newThemes));
        return newThemes;
    });
  };

  // Apply theme colors as CSS variables
  useEffect(() => {
    const themeToApply = previewTheme || activeTheme;
    const root = document.documentElement;
    Object.entries(themeToApply.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    // Apply body styles directly
    document.body.className = 'antialiased bg-primary text-primary';
  }, [activeTheme, previewTheme]);
  
  // Manage ambient sound
  useEffect(() => {
    if (audioRef.current) {
        if (isSoundEnabled) {
            // FIX: The caught error `e` is of type `unknown`. It is converted to a string before logging to fix the type error.
            audioRef.current.play().catch(e => console.error(`Audio play failed: ${String(e)}`));
        } else {
            audioRef.current.pause();
        }
    }
    localStorage.setItem('flowstate-sound-enabled', String(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = () => setIsSoundEnabled(prev => !prev);
  // --- END THEME & AMBIANCE ---

  const isReadOnly = currentUser.role === 'Viewer';

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const newToast = { ...toast, id: Date.now() };
    setToasts(prev => [newToast, ...prev]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);
  
  const addWebhookToast = useCallback((message: string) => {
    addToast({ type: 'webhook', message });
  }, [addToast]);

  const checkAndAwardBadges = useCallback((userId: string, updatedUser: User) => {
      let userAfterBadges = updatedUser;
      
      const firstStepsBadge = allBadges.find(b => b.id === 'badge-1')!;
      if (updatedUser.xp > 0 && !updatedUser.badges.some(b => b.id === firstStepsBadge.id)) {
        userAfterBadges = { ...userAfterBadges, badges: [...userAfterBadges.badges, firstStepsBadge]};
        addToast({ type: 'badge', message: `Badge Unlocked: ${firstStepsBadge.name}`, icon: firstStepsBadge.icon });
      }
      
      return userAfterBadges;
  }, [addToast]);

  const addXp = useCallback((userId: string, amount: number, message?: string) => {
    setUsers(prevUsers => {
      let finalUsers = prevUsers;
      const userIndex = prevUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) return prevUsers;
      
      const user = prevUsers[userIndex];
      const newXp = user.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      const titles = ['Rookie', 'Contributor', 'Pro', 'Expert', 'Architect', 'Visionary'];
      const newTitle = titles[Math.min(newLevel - 1, titles.length - 1)];

      let updatedUser = { ...user, xp: newXp, level: newLevel, title: newTitle };
      
      if (message) {
        addToast({ type: 'xp', message: `+${amount} XP: ${message}` });
      }

      if (newLevel > user.level) {
        addToast({ type: 'levelup', message: `Leveled up to Level ${newLevel} - ${newTitle}!` });
      }

      // Check for badges
      updatedUser = checkAndAwardBadges(userId, updatedUser);

      finalUsers = [...prevUsers];
      finalUsers[userIndex] = updatedUser;

      if(updatedUser.id === currentUser.id) {
          setCurrentUser(updatedUser);
      }
      
      return finalUsers;
    });
  }, [addToast, checkAndAwardBadges, currentUser.id]);
  
  const onTaskCompleted = useCallback((userId: string) => {
    addXp(userId, 50, 'Task Completed!');
    setUsers(prevUsers => {
      const userIndex = prevUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) return prevUsers;

      let user = prevUsers[userIndex];
      const taskMasterBadge = allBadges.find(b => b.id === 'badge-2')!;

      if (!user.badges.some(b => b.id === taskMasterBadge.id)) {
        user = { ...user, badges: [...user.badges, taskMasterBadge] };
        addToast({ type: 'badge', message: `Badge Unlocked: ${taskMasterBadge.name}`, icon: taskMasterBadge.icon });
        const newUsers = [...prevUsers];
        newUsers[userIndex] = user;
         if(user.id === currentUser.id) {
          setCurrentUser(user);
        }
        return newUsers;
      }
      return prevUsers;
    });
  }, [addXp, addToast, currentUser.id]);


  const handleLaunch = useCallback((launchArg?: string) => {
    const generateAvatarUrl = (name: string) => `https://api.dicebear.com/8.x/adventurer/svg?seed=${encodeURIComponent(name)}`;

    if (launchArg && launchArg.trim() !== "") {
        const mainUserId = 'user-1';
        let fullName = launchArg;

        if (launchArg.startsWith('google_signup:')) {
            fullName = launchArg.substring('google_signup:'.length);
        }

        setUsers(prevUsers => {
            const newUsers = prevUsers.map(u => {
                if (u.id === mainUserId) {
                    return { 
                        ...u, 
                        name: fullName,
                        avatarUrl: generateAvatarUrl(fullName) 
                    };
                }
                return u;
            });
            const updatedCurrentUser = newUsers.find(u => u.id === mainUserId);
            if (updatedCurrentUser) {
                setCurrentUser(updatedCurrentUser);
            }
            return newUsers;
        });
    }
    setIsAppLaunched(true);
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAppLaunched(false);
  }, []);

  const handleSetActiveProject = useCallback((project: Project) => {
    setActiveProjectId(project.id);
    setNavigationTarget({ view: 'dashboard' });
  }, []);

  const navigateTo = useCallback((target: NavigationTarget) => {
    setNavigationTarget(target);
  }, []);

  const search = useCallback((query: string): SearchResult[] => {
    const results: SearchResult[] = [];
    if (!query) return results;

    const lowerCaseQuery = query.toLowerCase();

    projects.forEach(project => {
      // Search pages
      const allPages: Page[] = [];
      const flattenPages = (pages: Page[]) => {
          pages.forEach(p => {
              allPages.push(p);
              if (p.children) flattenPages(p.children);
          });
      };
      flattenPages(project.pages);

      allPages.forEach(page => {
        if (page.title.toLowerCase().includes(lowerCaseQuery) || page.content.toLowerCase().includes(lowerCaseQuery)) {
          results.push({
            type: 'Page',
            title: page.title,
            context: project.name,
            id: page.id,
            action: () => navigateTo({ view: 'editor', pageId: page.id })
          });
        }
      });

      // Search kanban cards
      project.kanban.columns.forEach(column => {
        column.cards.forEach(card => {
          if (card.title.toLowerCase().includes(lowerCaseQuery) || card.description.toLowerCase().includes(lowerCaseQuery)) {
            results.push({
              type: 'Task',
              title: card.title,
              context: `${project.name} / ${column.title}`,
              id: card.id,
              action: () => navigateTo({ view: 'kanban', cardId: card.id })
            });
          }
        });
      });
    });

    return results;
  }, [projects, navigateTo]);
  
  const createProject = useCallback((name: string) => {
    const newProject: Project = {
        id: `proj-${Date.now()}`,
        name,
        iconUrl: `https://picsum.photos/seed/${name.toLowerCase().replace(/\s/g, '-')}/40/40`,
        pages: [{
            id: `page-${Date.now()}`,
            title: `Welcome to ${name}`,
            content: `<h1>Welcome to your new project: ${name}</h1><p>This is your starting page. Feel free to edit it or create new ones.</p>`,
            children: []
        }],
        kanban: {
            columns: [
                { id: `col-new-${Date.now()}-1`, title: 'To Do', cards: [] },
                { id: `col-new-${Date.now()}-2`, title: 'In Progress', cards: [] },
                { id: `col-new-${Date.now()}-3`, title: 'Done', cards: [] },
            ],
        },
        members: users, // All users are members of new projects for simplicity
        chatHistory: [],
        auditLog: [],
    };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    navigateTo({ view: 'dashboard' });
  }, [users, navigateTo]);

  const createPage = useCallback((title: string, content: string, parentId?: string) => {
    const newPage: Page = {
        id: `page-${Date.now()}`,
        title,
        content,
        parentId,
        children: []
    };
    
    setProjects(prevProjects => {
        const newProjects = [...prevProjects];
        const projectIndex = newProjects.findIndex(p => p.id === activeProjectId);
        if (projectIndex === -1) return prevProjects;

        const project = { ...newProjects[projectIndex] };
        
        if (parentId) {
            const findAndAdd = (pages: Page[]): boolean => {
                for (let page of pages) {
                    if (page.id === parentId) {
                        page.children = [...(page.children || []), newPage];
                        return true;
                    }
                    if (page.children && findAndAdd(page.children)) return true;
                }
                return false;
            }
            findAndAdd(project.pages);
             newProjects[projectIndex] = {...project, pages: [...project.pages]};

        } else {
             newProjects[projectIndex] = {...project, pages: [...project.pages, newPage]};
        }
        
        return newProjects;
    });

    addXp(currentUser.id, 15, 'New Page Created');
    navigateTo({ view: 'editor', pageId: newPage.id });
  }, [activeProjectId, addXp, currentUser.id, navigateTo]);

  const updateUserRole = useCallback((userId: string, role: User['role']) => {
    setUsers(prev => {
        const newUsers = prev.map(u => u.id === userId ? {...u, role} : u);
        if(userId === currentUser.id) {
            setCurrentUser(newUsers.find(u => u.id === userId)!);
        }
        return newUsers;
    });
  }, [currentUser.id]);

  const internalAddChatMessage = useCallback((text: string, user: User, projectId: string) => {
    const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        user,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, chatHistory: [...p.chatHistory, newMessage] } : p));
  }, []);

  const addChatMessage = useCallback((text: string) => {
      internalAddChatMessage(text, currentUser, activeProjectId);
  }, [currentUser, activeProjectId, internalAddChatMessage]);
  
  // Chat simulation
  useEffect(() => {
    if (!isAppLaunched) return;

    const intervalId = setInterval(() => {
        const otherUsers = users.filter(u => u.id !== currentUser.id);
        if (otherUsers.length === 0) return;

        const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
        const randomMessages = [
            "Quick update: I've pushed the latest changes.",
            "Anyone available for a code review?",
            "What's the status on the API integration?",
            "Just saw the new designs, they look amazing! ✨",
            "Let's touch base on the Phoenix Initiative tomorrow."
        ];
        const messageText = randomMessages[Math.floor(Math.random() * randomMessages.length)];

        internalAddChatMessage(messageText, randomUser, activeProjectId);

    }, 12000); // Every 12 seconds

    return () => clearInterval(intervalId);
  }, [isAppLaunched, users, currentUser.id, activeProjectId, internalAddChatMessage]);


  const addReactionToCard = useCallback((columnId: string, cardId: string, emoji: string) => {
    setProjects(prev => prev.map(p => {
        if (p.id !== activeProjectId) return p;
        
        const newColumns = p.kanban.columns.map(col => {
            if (col.id !== columnId) return col;
            
            const newCards = col.cards.map(card => {
                if (card.id !== cardId) return card;
                
                const reactions = [...card.reactions];
                const existingReaction = reactions.find(r => r.emoji === emoji);
                
                if (existingReaction) {
                    const userHasReacted = existingReaction.userIds.includes(currentUser.id);
                    if (userHasReacted) {
                        existingReaction.userIds = existingReaction.userIds.filter(id => id !== currentUser.id);
                    } else {
                        existingReaction.userIds.push(currentUser.id);
                    }
                    if (existingReaction.userIds.length === 0) {
                        return { ...card, reactions: reactions.filter(r => r.emoji !== emoji) };
                    }
                } else {
                    reactions.push({ emoji, userIds: [currentUser.id] });
                }
                return { ...card, reactions };
            });
            return { ...col, cards: newCards };
        });
        return { ...p, kanban: { ...p.kanban, columns: newColumns }};
    }));
  }, [activeProjectId, currentUser.id]);

  const markMentionsAsRead = useCallback(() => {
    setCurrentUser(prev => ({...prev, mentions: prev.mentions.map(m => ({...m, read: true}))}));
  }, []);

  const addStickyNote = useCallback((pageId: string, note: Omit<StickyNote, 'id'>) => {
    const newNote: StickyNote = { ...note, id: `note-${Date.now()}`};
    setProjects(prev => prev.map(p => {
        if (p.id !== activeProjectId) return p;
        const updatePages = (pages: Page[]): Page[] => {
            return pages.map(page => {
                if (page.id === pageId) {
                    return { ...page, stickyNotes: [...(page.stickyNotes || []), newNote] };
                }
                if (page.children) {
                    return { ...page, children: updatePages(page.children) };
                }
                return page;
            });
        };
        return { ...p, pages: updatePages(p.pages) };
    }));
  }, [activeProjectId]);

  const updateStickyNote = useCallback((pageId: string, noteId: string, updates: Partial<StickyNote>) => {
    setProjects(prev => prev.map(p => {
        if (p.id !== activeProjectId) return p;
        const updatePages = (pages: Page[]): Page[] => {
            return pages.map(page => {
                if (page.id === pageId) {
                    const newNotes = (page.stickyNotes || []).map(note => note.id === noteId ? {...note, ...updates} : note);
                    return { ...page, stickyNotes: newNotes };
                }
                if (page.children) {
                    return { ...page, children: updatePages(page.children) };
                }
                return page;
            });
        };
        return { ...p, pages: updatePages(p.pages) };
    }));
  }, [activeProjectId]);

  // --- KANBAN FUNCTIONS ---
    const addKanbanCard = useCallback((columnId: string, title: string) => {
        if (isReadOnly) return;
        const newCard: KanbanCard = {
            id: `card-${Date.now()}`,
            title,
            description: '',
            labels: [],
            priority: 'Medium',
            dueDate: new Date().toISOString().split('T')[0],
            assignee: currentUser,
            reactions: []
        };
        setProjects(prev => prev.map(p => {
            if (p.id !== activeProjectId) return p;
            const newColumns = p.kanban.columns.map(col => {
                if (col.id === columnId) {
                    return { ...col, cards: [...col.cards, newCard] };
                }
                return col;
            });
            return { ...p, kanban: { ...p.kanban, columns: newColumns } };
        }));
        addXp(currentUser.id, 10, 'Card Created');
    }, [activeProjectId, currentUser, addXp, isReadOnly]);

    const updateKanbanCard = useCallback((columnId: string, cardId: string, updates: Partial<Omit<KanbanCard, 'id'>>) => {
        if (isReadOnly) return;
        setProjects(prev => prev.map(p => {
            if (p.id !== activeProjectId) return p;
            const newColumns = p.kanban.columns.map(col => {
                if (col.id === columnId) {
                    const newCards = col.cards.map(card => card.id === cardId ? { ...card, ...updates } : card);
                    return { ...col, cards: newCards };
                }
                return col;
            });
            return { ...p, kanban: { ...p.kanban, columns: newColumns } };
        }));
        addXp(currentUser.id, 2, 'Card Edited');
    }, [activeProjectId, currentUser.id, addXp, isReadOnly]);

    const moveKanbanCard = useCallback((cardId: string, fromColumnId: string, toColumnId: string) => {
        if (fromColumnId === toColumnId || isReadOnly) return;
        
        let movedCard: KanbanCard | undefined;
        
        setProjects(prev => {
            const newProjects = [...prev];
            const projIndex = newProjects.findIndex(p => p.id === activeProjectId);
            if (projIndex === -1) return prev;

            const project = { ...newProjects[projIndex] };
            const columns = project.kanban.columns.map(c => ({ ...c, cards: [...c.cards] }));

            const fromColIndex = columns.findIndex(c => c.id === fromColumnId);
            const toColIndex = columns.findIndex(c => c.id === toColumnId);
            if (fromColIndex === -1 || toColIndex === -1) return prev;

            const cardIndex = columns[fromColIndex].cards.findIndex(c => c.id === cardId);
            if (cardIndex === -1) return prev;

            [movedCard] = columns[fromColIndex].cards.splice(cardIndex, 1);
            columns[toColIndex].cards.push(movedCard);

            project.kanban = { ...project.kanban, columns };
            newProjects[projIndex] = project;
            
             // Gamification logic
            const destColTitle = columns[toColIndex].title;
            if (destColTitle.toLowerCase() === 'done') {
                onTaskCompleted(currentUser.id);
                if (movedCard?.githubIssueUrl) {
                    addWebhookToast(`✅ Card "${movedCard.title}" completed. Simulating webhook.`);
                }
            } else {
                addXp(currentUser.id, 5, 'Card Moved');
            }
            
            return newProjects;
        });
    }, [activeProjectId, currentUser.id, addXp, onTaskCompleted, addWebhookToast, isReadOnly]);
    // --- END KANBAN ---

  if (!isAppLaunched) {
    return <LandingPage onLaunch={handleLaunch} />;
  }
  
  if (!activeProject) {
      // This can happen briefly if a project is deleted.
      // A more robust app would handle this gracefully.
      return <div>Loading project...</div>
  }

  const contextValue: AppContextType = {
    users, currentUser, projects, setProjects, activeProject, setActiveProject: handleSetActiveProject,
    addXp, logout: handleLogout, toasts, removeToast, onTaskCompleted, search, navigateTo, createPage, createProject,
    isReadOnly, updateUserRole, addChatMessage, addReactionToCard, markMentionsAsRead, addWebhookToast,
    addStickyNote, updateStickyNote,
    // Kanban
    addKanbanCard, updateKanbanCard, moveKanbanCard,
    // Theme and Ambiance
    activeTheme, setActiveTheme, customThemes, saveCustomTheme, setPreviewTheme, isSoundEnabled, toggleSound,
  };

  return (
    <AppContext.Provider value={contextValue}>
       {/* Ambient Sound Player */}
       <audio ref={audioRef} loop src="https://www.chosic.com/wp-content/uploads/2022/01/purrple-cat-dreaming-of-you.mp3" />
      <MainLayout navigationTarget={navigationTarget} />
    </AppContext.Provider>
  );
};

export default App;