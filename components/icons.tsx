import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const ChevronDownIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
  <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
  <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const KanbanIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
  <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
  <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
  <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
  <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.455-2.456L12.75 18l1.197-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L20.25 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 1011.31-8.25 9.75 9.75 0 00-11.31 0m11.31 8.25a1.5 1.5 0 01-1.5 1.5h-8.25a1.5 1.5 0 01-1.5-1.5m11.25 0a1.5 1.5 0 001.5-1.5v-3.75a1.5 1.5 0 00-1.5-1.5h-.525a1.5 1.5 0 00-1.5 1.5v3.75a1.5 1.5 0 001.5 1.5h.525zM5.25 18.75a1.5 1.5 0 01-1.5-1.5v-3.75a1.5 1.5 0 011.5-1.5h.525a1.5 1.5 0 011.5 1.5v3.75a1.5 1.5 0 01-1.5 1.5H5.25zM12 1.5c.375 0 .729.111 1.036.31a.75.75 0 01.364 1.036l-.82 1.859a1.5 1.5 0 00.106 1.598A9.736 9.736 0 0115 9.75c0 .375-.022.744-.063 1.107a.75.75 0 01-1.28.536l-1.859-.82a1.5 1.5 0 00-1.598.106 9.736 9.736 0 01-3.218 0 1.5 1.5 0 00-1.598-.106l-1.859.82a.75.75 0 01-1.28-.536A9.736 9.736 0 019 9.75c0-1.01.163-1.98.457-2.893a1.5 1.5 0 00.106-1.598l-.82-1.859a.75.75 0 01.364-1.036A3.733 3.733 0 0112 1.5z" />
    </svg>
);

export const LeaderboardIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1.5-1.5m1.5 1.5v5.25m0 0l-1.5-1.5m1.5 1.5l1.5-1.5" />
    </svg>
);

export const XIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const FileTextIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5" />
    </svg>
);

export const ListIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const TypeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H4.5M7.5 3.75V1.5M7.5 3.75v3.75m0-3.75h3.75m-3.75 0V1.5m0 2.25v3.75m0-3.75h3.75M16.5 3.75h3M16.5 3.75V1.5m0 2.25v3.75m0-3.75h-3.75m3.75 0V1.5m0 2.25v3.75m0-3.75h-3.75M12 21v-6.75m0 0A2.25 2.25 0 0114.25 12h.008a2.25 2.25 0 012.242 2.25 2.25 2.25 0 01-.478 1.348l-.92 1.38M12 14.25a2.25 2.25 0 00-2.25-2.25h-.008a2.25 2.25 0 00-2.242 2.25 2.25 2.25 0 00.478 1.348l.92 1.38" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.51.056 1.02.086 1.5.086s.99-.03 1.5-.086m-7.5 0a48.667 48.667 0 00-7.5 0m7.5 0a48.667 48.667 0 017.5 0m-7.5 0a48.667 48.667 0 00-7.5 0m7.5 0a48.667 48.667 0 017.5 0m-15 0a48.667 48.667 0 00-7.5 0m7.5 0a48.667 48.667 0 017.5 0m-7.5 0a48.667 48.667 0 00-7.5 0m7.5 0a48.667 48.667 0 017.5 0M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM12 12.75a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.532a2.25 2.25 0 01-2.174-2.174l.532-3.722c.092-1.133.957-2.007 2.096-2.096l4.286-.607c.969-.138 1.813.504 2.097 1.459zM3.75 14.25c.884-.284 1.5-1.128 1.5-2.097v-4.286c0-1.136.847-2.1 1.98-2.193l3.723-.533a2.25 2.25 0 012.174 2.174l-.532 3.722c-.092 1.133-.957 2.007-2.096 2.096l-4.286.607c-.969.138-1.813-.504-2.097-1.459z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const FaceSmileIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4.5 4.5 0 01-6.364 0M9 10.5h.008v.008H9v-.008zm6 0h.008v.008H15v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const GitHubIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);

export const StickyNoteIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const ArrowUpTrayIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

export const WifiIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
  <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.136 11.886c3.87-3.87 10.154-3.87 14.024 0M19.5 18.12a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const PaletteIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.375 3.375 0 013.375 17.625a3.375 3.375 0 013.375-3.375h1.5A3.375 3.375 0 0112 17.625v1.5A3.375 3.375 0 018.625 21h-1.875M16.5 4.5a4.5 4.5 0 00-6.364 6.364L6.75 15h6.75l6.364-6.364a4.5 4.5 0 00-6.364-6.364z" />
    </svg>
);

export const MusicalNoteIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.75M9 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.228 0-9.652-3.512-11.303-8H6.306C9.656 39.663 16.318 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.846 44 30.291 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a15.045 15.045 0 01-4.5 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...rest }) => (
    <svg className={className} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);