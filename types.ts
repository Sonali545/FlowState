export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Could be a component or URL, string for simplicity
}

export interface Reaction {
  emoji: string;
  userIds: string[];
}

export interface ChatMessage {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: string;
}

export interface Mention {
    id: string;
    fromUserId: string;
    text: string;
    location: string;
    read: boolean;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'Owner' | 'Admin' | 'Editor' | 'Viewer';
  xp: number;
  level: number;
  title: string;
  badges: Badge[];
  mentions: Mention[];
}

export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  assignee?: User;
  labels: string[];
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  reactions: Reaction[];
  githubIssueUrl?: string;
}

export interface KanbanColumn {
  id:string;
  title: string;
  cards: KanbanCard[];
}

export interface StickyNote {
  id: string;
  content: string;
  authorId: string;
  position: { x: number; y: number };
}

export interface Page {
  id: string;
  title: string;
  content: string;
  parentId?: string;
  children?: Page[];
  stickyNotes?: StickyNote[];
}

export interface Project {
  id: string;
  name: string;
  iconUrl: string;
  pages: Page[];
  kanban: {
    columns: KanbanColumn[];
  };
  members: User[];
  chatHistory: ChatMessage[];
  auditLog: AuditLogEntry[];
}

export interface ToastData {
    id: number;
    type: 'xp' | 'badge' | 'levelup' | 'info' | 'webhook';
    message: string;
    icon?: string;
}

export interface SearchResult {
    id: string;
    type: 'Page' | 'Task';
    title: string;
    context: string;
    action: () => void;
}

export interface PageTemplate {
    id: string;
    name: string;
    description: string;
    content: string;
}

export interface Theme {
    id: string;
    name: string;
    colors: {
        '--bg-primary': string;
        '--bg-secondary': string;
        '--text-primary': string;
        '--text-secondary': string;
        '--border-primary': string;
        '--accent-primary': string;
        '--accent-secondary': string;
        '--accent-text': string;
        '--hover-primary': string;
    };
}
