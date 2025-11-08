import type { User, Project, Badge, PageTemplate, ChatMessage, AuditLogEntry, Mention, Reaction, Theme } from './types';

const LEVEL_THRESHOLD = 100;
const getLevel = (xp: number) => Math.floor(xp / LEVEL_THRESHOLD) + 1;
const getTitle = (level: number) => {
    const titles = ['Rookie', 'Contributor', 'Pro', 'Expert', 'Architect', 'Visionary'];
    return titles[Math.min(level - 1, titles.length - 1)];
};

export const badges: Badge[] = [
    { id: 'badge-1', name: 'First Steps', description: 'Earn your first XP.', icon: '👣' },
    { id: 'badge-2', name: 'Task Master', description: 'Complete your first task.', icon: '✅' },
    { id: 'badge-3', name: 'Doc Drafter', description: 'Create a new page.', icon: '✍️' },
    { id: 'badge-4', name: 'Collaborator', description: 'Move 10 cards.', icon: '🤝' },
];

export const pageTemplates: PageTemplate[] = [
    { 
        id: 'blank', 
        name: 'Blank Page', 
        description: 'Start with a clean slate.',
        content: '<p>Start writing your document here...</p>' 
    },
    { 
        id: 'meeting-notes', 
        name: 'Meeting Notes', 
        description: 'A structured format for meeting minutes.',
        content: `
<h1>Meeting Title</h1>
<p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
<h2>Attendees</h2>
<ul>
    <li></li>
</ul>
<h2>Agenda</h2>
<ol>
    <li></li>
</ol>
<h2>Action Items</h2>
<ul>
    <li></li>
</ul>
        `.trim(),
    },
];

const alexXp = 250;
const alexLevel = getLevel(alexXp);

export const mockMentions: Mention[] = [
    { id: 'mention-1', fromUserId: 'user-2', text: "Hey @Alex, can you look at this design mockup?", location: "Card: Design initial mockups", read: false },
    { id: 'mention-2', fromUserId: 'user-4', text: "@Alex, the API is ready for testing.", location: "Card: API endpoint for user data", read: true },
]

export const mockUsers: User[] = [
  { 
    id: 'user-1', name: 'Alex', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Alex', role: 'Owner', 
    xp: alexXp, level: alexLevel, title: getTitle(alexLevel), badges: [], mentions: mockMentions 
  },
  { id: 'user-2', name: 'Sam', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Sam', role: 'Editor', xp: 550, level: 6, title: 'Architect', badges: [], mentions: [] },
  { id: 'user-3', name: 'Jamie', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Jamie', role: 'Viewer', xp: 80, level: 1, title: 'Rookie', badges: [], mentions: [] },
  { id: 'user-4', name: 'Taylor', avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Taylor', role: 'Admin', xp: 120, level: 2, title: 'Contributor', badges: [], mentions: [] },
];

const mockChatHistory: ChatMessage[] = [
    { id: 'chat-1', user: mockUsers[1], text: 'Hey team, kickoff for Phoenix is next Monday!', timestamp: '10:30 AM' },
    { id: 'chat-2', user: mockUsers[3], text: 'Awesome! I have the repo structure ready.', timestamp: '10:31 AM' },
    { id: 'chat-3', user: mockUsers[0], text: 'Great. Let\'s sync up on the component library choice tomorrow.', timestamp: '10:32 AM' },
];

const mockAuditLog: AuditLogEntry[] = [
    { id: 'log-1', user: mockUsers[0], action: 'Created Page', target: 'Project Phoenix Overview', timestamp: '2 days ago' },
    { id: 'log-2', user: mockUsers[1], action: 'Moved Card', target: 'Design initial mockups to To Do', timestamp: '1 day ago' },
    { id: 'log-3', user: mockUsers[3], action: 'Changed Role', target: 'Jamie to Viewer', timestamp: '3 hours ago' },
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Phoenix Initiative',
    iconUrl: 'https://picsum.photos/seed/phoenix/40/40',
    members: mockUsers,
    chatHistory: mockChatHistory,
    auditLog: mockAuditLog,
    pages: [
      {
        id: 'page-1',
        title: 'Project Phoenix Overview',
        content: '<h1>Project Phoenix Overview</h1><p>This document outlines the main goals, scope, and timeline for the Phoenix Initiative. Our primary objective is to rebuild the customer-facing portal from the ground up using modern technologies.</p><h2>Goals</h2><ul><li>Improve performance by 50%</li><li>Enhance user experience with a new UI/UX design</li><li>Integrate AI-powered features for personalization</li></ul>',
        stickyNotes: [
          { id: 'note-1', content: 'Need to double-check these stats before the client presentation!', authorId: 'user-2', position: { x: 85, y: 120 } }
        ],
        children: [
          {
            id: 'page-1-1',
            title: 'Technical Specification',
            content: '<h2>Technical Specification</h2><p>The new portal will be built using a micro-frontend architecture with React.js and TypeScript.</p>',
          },
          {
            id: 'page-1-2',
            title: 'Marketing Plan',
            content: '<h2>Marketing Plan</h2><p>Our go-to-market strategy will focus on digital channels and existing customer engagement.</p>',
          },
        ],
      },
      {
        id: 'page-2',
        title: 'Meeting Notes',
        content: '<h1>Meeting Notes</h1><p>Collection of all project-related meeting notes.</p>',
      },
    ],
    kanban: {
      columns: [
        {
          id: 'col-1',
          title: 'Backlog',
          cards: [
            { id: 'card-1', title: 'Setup project repository', description: 'Initialize GitHub repo with starter code.', labels: ['setup', 'devops'], assignee: mockUsers[3], priority: 'High', dueDate: '2024-08-01', reactions: [{ emoji: '👍', userIds: ['user-2', 'user-4'] }] },
            { id: 'card-2', title: 'Design initial mockups', description: 'Create Figma designs for the main dashboard.', labels: ['design', 'ux'], assignee: mockUsers[1], priority: 'High', dueDate: '2024-08-05', reactions: [], githubIssueUrl: 'https://github.com/example/phoenix/issues/1' },
          ],
        },
        {
          id: 'col-2',
          title: 'To Do',
          cards: [
            { id: 'card-3', title: 'Develop login page component', description: 'Build the React component for user authentication.', labels: ['frontend', 'auth'], assignee: mockUsers[0], priority: 'Medium', dueDate: '2024-08-10', reactions: [] },
          ],
        },
        {
          id: 'col-3',
          title: 'In Progress',
          cards: [
            { id: 'card-4', title: 'API endpoint for user data', description: 'Create the backend service to fetch user profiles.', labels: ['backend', 'api'], assignee: mockUsers[3], priority: 'Medium', dueDate: '2024-08-12', reactions: [{ emoji: '🚀', userIds: ['user-1'] }] },
          ],
        },
        {
          id: 'col-4',
          title: 'Done',
          cards: [
            { id: 'card-5', title: 'Choose a component library', description: 'Decided to use Tailwind CSS for styling.', labels: ['research', 'frontend'], assignee: mockUsers[0], priority: 'Low', dueDate: '2024-07-20', reactions: [] },
          ],
        },
      ],
    },
  },
  {
    id: 'proj-2',
    name: 'Aquila Project',
    iconUrl: 'https://picsum.photos/seed/aquila/40/40',
    members: mockUsers,
    chatHistory: [],
    auditLog: [],
    pages: [
        {
            id: 'page-3',
            title: 'Aquila Research Docs',
            content: '<h1>Aquila Research Documentation</h1><p>Central hub for all research findings related to Project Aquila.</p>'
        }
    ],
    kanban: {
        columns: [
            { id: 'col-5', title: 'Ideas', cards: [] },
            { id: 'col-6', title: 'In Progress', cards: [] },
            { id: 'col-7', 'title': 'Completed', cards: [] },
        ]
    }
  },
];


export const THEMES: Theme[] = [
    {
        id: 'light',
        name: 'Light',
        colors: {
            '--bg-primary': '#FFFFFF',
            '--bg-secondary': '#F3F4F6',
            '--text-primary': '#1F2937',
            '--text-secondary': '#6B7280',
            '--border-primary': '#E5E7EB',
            '--accent-primary': '#4F46E5',
            '--accent-secondary': '#3B82F6',
            '--accent-text': '#FFFFFF',
            '--hover-primary': '#E5E7EB',
        },
    },
    {
        id: 'dark',
        name: 'Dark',
        colors: {
            '--bg-primary': '#111827',
            '--bg-secondary': '#1F2937',
            '--text-primary': '#F9FAFB',
            '--text-secondary': '#9CA3AF',
            '--border-primary': '#374151',
            '--accent-primary': '#6366F1',
            '--accent-secondary': '#3B82F6',
            '--accent-text': '#FFFFFF',
            '--hover-primary': '#374151',
        },
    },
    {
        id: 'neon',
        name: 'Neon',
        colors: {
            '--bg-primary': '#0D012C',
            '--bg-secondary': '#1C0B4F',
            '--text-primary': '#F6F7F9',
            '--text-secondary': '#A5B4FC',
            '--border-primary': '#4F46E5',
            '--accent-primary': '#EC4899',
            '--accent-secondary': '#0E7490',
            '--accent-text': '#FFFFFF',
            '--hover-primary': '#312E81',
        },
    },
    {
        id: 'minimal',
        name: 'Minimal',
        colors: {
            '--bg-primary': '#FFFFFF',
            '--bg-secondary': '#FAFAFA',
            '--text-primary': '#262626',
            '--text-secondary': '#737373',
            '--border-primary': '#F0F0F0',
            '--accent-primary': '#262626',
            '--accent-secondary': '#A3A3A3',
            '--accent-text': '#FFFFFF',
            '--hover-primary': '#F5F5F5',
        },
    },
     {
        id: 'festive',
        name: 'Festive',
        colors: {
            '--bg-primary': '#FEF3C7',
            '--bg-secondary': '#FFFBEB',
            '--text-primary': '#92400E',
            '--text-secondary': '#B45309',
            '--border-primary': '#FDE68A',
            '--accent-primary': '#DC2626',
            '--accent-secondary': '#16A34A',
            '--accent-text': '#FFFFFF',
            '--hover-primary': '#FDE68A',
        },
    },
];
