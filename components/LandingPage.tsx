import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, SunIcon, MoonIcon, GoogleIcon, GitHubIcon, XIcon, PlusIcon, SearchIcon, DashboardIcon, DocumentIcon, KanbanIcon } from './icons';
import HeroAnimation from './HeroAnimation';

interface LandingPageProps {
  onLaunch: (fullName?: string) => void;
}

// --- SUB-COMPONENTS for Landing Page ---

const MockGoogleSignInPopup: React.FC = () => (
    <div className="fixed inset-0 bg-white/80 dark:bg-black/80 z-[80] flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
            <GoogleIcon className="w-12 h-12" />
            <p className="font-semibold text-gray-700 dark:text-gray-200">Signing in with Google...</p>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-gray-400">Please wait while we connect to your account.</p>
        </div>
    </div>
);

const GoogleAccountChooserModal: React.FC<{
    onClose: () => void;
    onSelectAccount: (name: string) => void;
}> = ({ onClose, onSelectAccount }) => {
    const mockAccounts = [
        { name: 'Jordan Lee', email: 'jordan.lee@example.com', avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=JordanLee' },
        { name: 'Casey Morgan', email: 'casey.morgan@example.com', avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=CaseyMorgan' },
    ];

    const [showCustomInput, setShowCustomInput] = React.useState(false);
    const [customName, setCustomName] = React.useState('');
    
    const handleCustomNameSubmit = () => {
        if (customName.trim()) {
            onSelectAccount(customName.trim());
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[70] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <AnimatePresence mode="wait">
            {showCustomInput ? (
                <motion.div
                    key="custom-input"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm p-8"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center gap-4 mb-4">
                         <button onClick={() => setShowCustomInput(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Sign up</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your name</p>
                        </div>
                    </div>

                    <input 
                        type="text"
                        value={customName}
                        onChange={e => setCustomName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleCustomNameSubmit()}
                        placeholder="First and last name"
                        autoFocus
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end mt-6">
                        <button 
                            onClick={handleCustomNameSubmit}
                            disabled={!customName.trim()}
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
                        >
                            Next
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="account-chooser"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <GoogleIcon className="w-8 h-8" />
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Choose an account</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">to continue to FlowState</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"><XIcon className="w-5 h-5"/></button>
                    </div>
                    <div className="py-2">
                        {mockAccounts.map(account => (
                            <button 
                                key={account.email} 
                                onClick={() => onSelectAccount(account.name)}
                                className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                            >
                                <img src={account.avatar} alt={account.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{account.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{account.email}</p>
                                </div>
                            </button>
                        ))}
                         <button
                            onClick={() => setShowCustomInput(true)}
                            className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                         >
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Use another account</p>
                         </button>
                    </div>
                     <div className="px-6 py-4 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700">
                         To continue, Google will share your name, email address, and profile picture with FlowState.
                     </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );
};


const AuthModal: React.FC<{
  type: 'signIn' | 'signUp';
  onClose: () => void;
  onSuccess: (fullName?: string) => void;
  onSwitch: () => void;
}> = ({ type, onClose, onSuccess, onSwitch }) => {
    const isSignUp = type === 'signUp';
    const [fullName, setFullName] = React.useState('');
    const [isGoogleAuthLoading, setIsGoogleAuthLoading] = React.useState(false);
    const [isChoosingGoogleAccount, setIsChoosingGoogleAccount] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSuccess(isSignUp ? fullName : undefined);
    };
    
    const handleGoogleAccountSelected = (name: string) => {
        setIsChoosingGoogleAccount(false);
        setIsGoogleAuthLoading(true);
        setTimeout(() => {
            onSuccess(isSignUp ? `google_signup:${name}` : undefined);
            setIsGoogleAuthLoading(false);
        }, 1500);
    };

    const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
        if (provider === 'Google') {
            if (isSignUp) {
                setIsChoosingGoogleAccount(true);
            } else {
                // For sign-in, keep the simple loading simulation and log in the default user.
                setIsGoogleAuthLoading(true);
                setTimeout(() => {
                    onSuccess();
                    setIsGoogleAuthLoading(false);
                }, 1500);
            }
            return;
        }
        
        // GitHub or other sign-ups can be instant for this simulation
        if (isSignUp) {
            const nameToPass = fullName.trim() || `${provider} User`;
            onSuccess(nameToPass);
        } else {
            onSuccess();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isChoosingGoogleAccount && (
                    <GoogleAccountChooserModal
                        onClose={() => setIsChoosingGoogleAccount(false)}
                        onSelectAccount={handleGoogleAccountSelected}
                    />
                )}
            </AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {isGoogleAuthLoading && <MockGoogleSignInPopup />}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-8 relative">
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition">
                            <XIcon className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
                            {isSignUp ? 'Create Your FlowState' : 'Welcome Back'}
                        </h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                            {isSignUp ? 'Begin your journey to peak productivity.' : 'Continue your great work.'}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <div className="relative">
                                <input id="fullName" type="text" placeholder=" " required className="block px-3 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 dark:border-gray-600 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-indigo-500 peer" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                <label htmlFor="fullName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Full Name</label>
                            </div>
                        )}
                        <div className="relative">
                            <input id="email" type="email" placeholder=" " required className="block px-3 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 dark:border-gray-600 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-indigo-500 peer" />
                            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email Address</label>
                        </div>
                        <div className="relative">
                            <input id="password" type="password" placeholder=" " required className="block px-3 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 dark:border-gray-600 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-indigo-500 peer" />
                            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                        </div>

                            <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300">
                                {isSignUp ? 'Get Started' : 'Sign In'}
                            </button>
                        </form>
                        
                        <div className="flex items-center my-6">
                            <hr className="w-full border-gray-300 dark:border-gray-700" />
                            <span className="px-2 text-gray-400 text-sm">OR</span>
                            <hr className="w-full border-gray-300 dark:border-gray-700" />
                        </div>

                        <div className="space-y-3">
                            <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <GoogleIcon className="w-5 h-5" /> Continue with Google
                            </button>
                            <button onClick={() => handleSocialLogin('GitHub')} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <GitHubIcon className="w-5 h-5" /> Continue with GitHub
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button onClick={onSwitch} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

const FeatureDetailModal: React.FC<{ feature: any, onClose: () => void }> = ({ feature, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative h-64">
                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="p-8">
                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h2>
                 <p className="text-lg text-gray-600 dark:text-gray-400">{feature.longDescription}</p>
                 <button onClick={onClose} className="mt-6 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                     Close
                 </button>
            </div>
        </motion.div>
    </motion.div>
);

const LightboxModal: React.FC<{ src: string, onClose: () => void }> = ({ src, onClose }) => (
     <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
        <motion.img
            layoutId={`showcase-image-${src}`}
            src={src}
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        />
    </motion.div>
);


const PinterestGrid: React.FC<{ onFeatureSelect: (feature: any) => void }> = ({ onFeatureSelect }) => {
    const gridItems = [
        { title: "Real-time Docs", description: "Collaborate seamlessly.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", span: "row-span-2", longDescription: "Experience Google Docs-style collaboration where you can see cursors, type together, and leave comments in real-time. Our editor supports rich text, markdown shortcuts, tables, and embeds to bring your documents to life." },
        { title: "AI Summaries", description: "Condense long pages.", img: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop", span: "", longDescription: "Overwhelmed by a long document? Let our AI assistant condense it into key bullet points with a single click. Perfect for meeting notes, project specs, and research papers." },
        { title: "Fluid Kanban", description: "Visualize your workflow.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", span: "", longDescription: "Move tasks from 'To Do' to 'Done' with our intuitive drag-and-drop Kanban boards. Customize columns, add labels, assignees, and due dates to keep your projects on track." },
        { title: "Team Chat", description: "Stay in sync.", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop", span: "row-span-2", longDescription: "Every project comes with a dedicated chat room. Discuss ideas, share files, and keep conversations organized and in context, right where you work." },
        { title: "Analytics", description: "Track progress.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop", span: "col-span-2", longDescription: "Get a clear overview of your team's productivity with our built-in dashboards. Track task completion, document activity, and individual contributions to make data-driven decisions." },
        { title: "Version History", description: "Never lose an idea.", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop", span: "", longDescription: "FlowState automatically saves versions of your documents as you work. Easily compare changes, see who contributed what, and restore previous versions anytime." },
    ];

    return (
        <section id="features" className="py-24 bg-slate-50 dark:bg-black">
            <div className="container mx-auto px-4">
                 <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-4">Everything in one workspace.</h2>
                 <p className="text-lg text-gray-500 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">From AI-powered docs to fluid Kanban boards, FlowState brings all your work and knowledge together.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {gridItems.map((item, i) => (
                        <motion.div 
                            key={i} 
                            onClick={() => onFeatureSelect(item)}
                            className={`group relative rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-1 cursor-pointer ${item.span}`}
                             initial={{ opacity: 0, y: 50 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true, amount: 0.3 }}
                             transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.05 }}
                        >
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4 md:p-6 transition-all duration-300">
                                <h3 className="text-white font-bold text-lg md:text-xl">{item.title}</h3>
                                <p className="text-gray-200 text-sm opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Showcase: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => {
    type Tab = 'dashboard' | 'editor' | 'kanban';
    const [activeTab, setActiveTab] = React.useState<Tab>('dashboard');

    const tabs: { id: Tab; name: string; icon: React.ReactNode; image: string; title: string; conceptImage: string; }[] = [
        { 
            id: 'dashboard', 
            name: 'Dashboard', 
            icon: <DashboardIcon />, 
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            title: 'Your Command Center.',
            conceptImage: 'https://images.unsplash.com/photo-1634733301494-0a8a48b82492?q=80&w=1932&auto=format&fit=crop'
        },
        { 
            id: 'editor', 
            name: 'AI Editor', 
            icon: <DocumentIcon />, 
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
            title: 'Docs That Power Your Team.',
            conceptImage: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop'
        },
        { 
            id: 'kanban', 
            name: 'Kanban Board', 
            icon: <KanbanIcon />, 
            image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=2574&auto=format&fit=crop',
            title: 'Visualize Your Workflow.',
            conceptImage: 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?q=80&w=2070&auto=format&fit=crop'
        }
    ];
    
    const activeContent = tabs.find(t => t.id === activeTab)!;

    return (
        <motion.div
            className="w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex justify-center mb-8 border border-gray-200 dark:border-gray-700 rounded-full p-1 bg-gray-100 dark:bg-gray-800 w-fit mx-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base font-semibold rounded-full transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="showcase-active-tab"
                                className="absolute inset-0 bg-indigo-600 rounded-full"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{tab.icon}</span>
                        <span className="relative z-10">{tab.name}</span>
                    </button>
                ))}
            </div>
            <div 
                className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200 dark:border-gray-700 cursor-pointer group"
                onClick={() => onImageClick(activeContent.image)}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeTab}
                        src={activeContent.image}
                        layoutId={`showcase-image-${activeContent.image}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 bg-white/80 dark:bg-black/80 rounded-full backdrop-blur-sm">
                        <SearchIcon className="w-8 h-8 text-gray-800 dark:text-white"/>
                    </div>
                </div>
            </div>
             <div className="mt-8 max-w-2xl mx-auto text-center">
                 <AnimatePresence mode="wait">
                    <motion.h3
                         key={activeTab + '-title'}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.3, ease: 'easeInOut' }}
                         className="text-2xl font-bold text-gray-800 dark:text-white"
                     >
                         {activeContent.title}
                     </motion.h3>
                 </AnimatePresence>
            </div>
        </motion.div>
    );
};

const Pricing: React.FC<{ onAuthTrigger: () => void; }> = ({ onAuthTrigger }) => {
    const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            name: 'Free',
            price: { monthly: 0, yearly: 0 },
            description: 'For individuals and small teams getting started.',
            features: ['3 Projects', 'Real-time collaboration', 'Basic Kanban board', '100 MB storage'],
            cta: 'Get Started',
        },
        {
            name: 'Pro',
            price: { monthly: 10, yearly: 8 },
            description: 'For growing teams that need more power and support.',
            features: ['Unlimited Projects', 'AI-powered summaries', 'Advanced Kanban views', 'Version history', '10 GB storage'],
            cta: 'Try Pro for free',
            isPopular: true,
        },
        {
            name: 'Enterprise',
            price: null,
            description: 'For large organizations with advanced security and control needs.',
            features: ['Everything in Pro', 'SAML SSO', 'Dedicated support', 'Audit logs', 'Unlimited storage'],
            cta: 'Contact Sales',
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-4">Find the right plan for you</h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">Start for free, then upgrade as you grow. No credit card required.</p>
                
                <div className="flex justify-center items-center gap-4 mb-10">
                    <span className={`font-medium ${billingCycle === 'monthly' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>Monthly</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={billingCycle === 'yearly'} onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                    <span className={`font-medium ${billingCycle === 'yearly' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>Yearly</span>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Save 20%</span>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`relative border rounded-2xl p-8 flex flex-col ${plan.isPopular ? 'border-indigo-500 dark:border-indigo-400' : 'border-gray-200 dark:border-gray-700'}`}
                        >
                             {plan.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">POPULAR</div>}
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">{plan.description}</p>
                            
                            <div className="mb-8">
                                {plan.price !== null ? (
                                    <p className="text-5xl font-extrabold text-gray-900 dark:text-white">
                                        ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                                        <span className="text-lg font-medium text-gray-500 dark:text-gray-400">/ user / mo</span>
                                    </p>
                                ) : (
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">Custom</p>
                                )}
                            </div>

                            <ul className="space-y-4 text-gray-600 dark:text-gray-300 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={onAuthTrigger} className={`mt-10 w-full py-3 px-6 font-semibold rounded-lg transition-transform transform hover:-translate-y-0.5 ${plan.isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-50 text-indigo-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700'}`}>
                               {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


interface FloatingActionButtonProps {
    onAuthTrigger: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onAuthTrigger }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="fixed bottom-6 right-6 z-40">
            <AnimatePresence>
                {isOpen && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={onAuthTrigger} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"><SearchIcon className="w-4 h-4" /> Search...</button>
                        <button onClick={onAuthTrigger} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"><PlusIcon className="w-4 h-4" /> New Doc</button>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)} 
                className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center"
            >
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
                    <PlusIcon className="w-7 h-7" />
                </motion.div>
            </motion.button>
        </div>
    );
};

// --- MAIN LANDING PAGE COMPONENT ---
const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
    const [authModal, setAuthModal] = React.useState<'signIn' | 'signUp' | null>(null);
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('flowstate-landing-theme') === 'dark';
        }
        return false;
    });

    // State for interactive modals
    const [selectedFeature, setSelectedFeature] = React.useState<any | null>(null);
    const [lightboxImage, setLightboxImage] = React.useState<string | null>(null);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('flowstate-landing-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const triggerAuth = () => setAuthModal('signUp');

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <>
      <AnimatePresence>
        {authModal && (
          <AuthModal type={authModal} onClose={() => setAuthModal(null)} onSuccess={onLaunch} onSwitch={() => setAuthModal(authModal === 'signIn' ? 'signUp' : 'signIn')} />
        )}
        {selectedFeature && <FeatureDetailModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />}
        {lightboxImage && <LightboxModal src={lightboxImage} onClose={() => setLightboxImage(null)} />}
      </AnimatePresence>
      <div className="min-h-screen bg-white dark:bg-[#0B0B0F] text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <style>{`
            html {
                scroll-behavior: smooth;
            }
            @keyframes animated-gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animated-gradient-text {
                background-size: 200%;
                background-position: 0% 50%;
                animation: animated-gradient 3s ease infinite;
            }
             @keyframes wave {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .wave-bg {
                background: linear-gradient(300deg, #e0e7ff, #c7d2fe, #f5f3ff);
                background-size: 180% 180%;
                animation: wave 15s ease infinite;
            }
             .dark .wave-bg {
                background: linear-gradient(300deg, #1e1b4b, #111827, #0b0b0f);
                background-size: 180% 180%;
                animation: wave 15s ease infinite;
            }
        `}</style>
        
        <header className="sticky top-0 left-0 right-0 z-40 p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200/50 dark:border-white/10">
             <div className="container mx-auto flex justify-between items-center">
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">FlowState</span>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="relative group py-1">
                        Features
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                    </a>
                    <a href="#showcase" onClick={(e) => handleNavClick(e, 'showcase')} className="relative group py-1">
                        Showcase
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                    </a>
                    <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="relative group py-1">
                        Pricing
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                    </a>
                </nav>
                <div className="flex items-center gap-2">
                    <button onClick={() => setAuthModal('signIn')} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">Sign in</button>
                    <motion.button 
                        onClick={() => setAuthModal('signUp')} 
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(99 102 241 / 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full transition-shadow">Get Started</motion.button>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <AnimatePresence mode="wait">
                            <motion.div key={isDarkMode ? 'moon' : 'sun'} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                                {isDarkMode ? <SunIcon className="w-5 h-5"/> : <MoonIcon className="w-5 h-5"/>}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
             </div>
        </header>
        
        <main>
            <div id="get-started" className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-0 z-0 wave-bg" />
                <div className="relative z-10 container mx-auto grid lg:grid-cols-2 items-center gap-8">
                    <div className="text-center lg:text-left">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-slate-700 to-indigo-600 dark:from-gray-50 dark:via-indigo-400 dark:to-purple-400 mb-6 tracking-tighter animated-gradient-text"
                        >
                            Where ideas flow into action.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="text-lg md:text-xl text-gray-700 dark:text-gray-400 max-w-xl mx-auto lg:mx-0"
                        >
                            FlowState is the AI-powered workspace where your team's docs, tasks, and conversations come together seamlessly.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            className="mt-10"
                        >
                            <motion.button 
                                onClick={() => setAuthModal('signUp')} 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-indigo-500/50 transition-shadow">
                                Try for free
                            </motion.button>
                        </motion.div>
                    </div>
                    <div className="relative hidden lg:block h-96">
                        <HeroAnimation />
                    </div>
                </div>
            </div>

            <PinterestGrid onFeatureSelect={setSelectedFeature} />

            <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="container mx-auto px-4 space-y-20 md:space-y-28">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                            <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Collaborative Docs, Elevated.</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Write, edit, and comment in real-time. With rich formatting, slash commands, and AI assistance, your team's best ideas come to life faster than ever.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: "easeOut" }} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-inner">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Docs" className="rounded-xl object-cover" />
                        </motion.div>
                    </div>
                     <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: "easeOut" }} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-inner md:order-last">
                             <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Kanban" className="rounded-xl object-cover" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: "easeOut" }} className="md:order-first">
                            <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Projects in Perfect Flow.</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Move tasks from idea to done with our fluid Kanban boards. Drag, drop, and customize your workflow to fit your team's unique rhythm.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="showcase" className="py-24 bg-slate-50 dark:bg-black">
                <div className="container mx-auto px-4 text-center">
                    <Showcase onImageClick={setLightboxImage} />
                </div>
            </section>

            <Pricing onAuthTrigger={triggerAuth} />
        </main>

        <footer className="py-16 bg-white dark:bg-[#0B0B0F] border-t border-gray-100 dark:border-white/10">
            <div className="container mx-auto px-4 text-center">
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 inline-block">FlowState</span>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Made with 💜 by the FlowState.AI team.</p>
                <div className="text-sm text-gray-400 dark:text-gray-500">
                    © 2025 FlowState.AI | All Rights Reserved.
                </div>
            </div>
        </footer>
        
        <FloatingActionButton onAuthTrigger={triggerAuth} />
      </div>
    </>
  );
};

export default LandingPage;