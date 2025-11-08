import React, { useContext } from 'react';
import { AppContext } from '../App';
import { TrophyIcon, DocumentIcon, KanbanIcon, UsersIcon } from './icons';
import type { Badge, User, Project } from '../types';

const BadgeDisplay: React.FC<{ badge: Badge }> = ({ badge }) => (
    <div className="flex items-center gap-4 bg-secondary p-3 rounded-lg border border-primary">
        <span className="text-3xl">{badge.icon}</span>
        <div>
            <p className="font-semibold text-primary">{badge.name}</p>
            <p className="text-sm text-secondary">{badge.description}</p>
        </div>
    </div>
);

const TeamActivityChart: React.FC<{ users: User[], projects: Project[] }> = ({ users, projects }) => {
    const taskCounts = users.map(user => {
        const count = projects.reduce((projectAcc, project) => {
            return projectAcc + project.kanban.columns.reduce((colAcc: any, col: any) => {
                return colAcc + col.cards.filter((card: any) => card.assignee?.id === user.id).length;
            }, 0);
        }, 0);
        return { name: user.name, tasks: count };
    });

    const maxTasks = Math.max(...taskCounts.map(u => u.tasks), 1);

    return (
        <div className="space-y-4">
            {taskCounts.map(user => (
                <div key={user.name} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-medium text-secondary truncate">{user.name}</span>
                    <div className="flex-1 bg-secondary rounded-full h-4">
                        <div 
                            className="bg-accent h-4 rounded-full text-right pr-2 text-accent text-xs flex items-center justify-end" 
                            style={{ width: `${(user.tasks / maxTasks) * 100}%` }}
                        >
                           {user.tasks > 0 && user.tasks}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const OwnerOverview: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const totalMembers = new Set(projects.flatMap(p => p.members.map(m => m.id))).size;
    const openTasks = projects.reduce((acc, p) => acc + p.kanban.columns.filter(c => c.title.toLowerCase() !== 'done').reduce((colAcc, c) => colAcc + c.cards.length, 0), 0);
    
    return (
        <div className="bg-primary p-6 rounded-xl border border-primary shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-4">Owner's Overview</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-full"><UsersIcon className="w-6 h-6 text-green-500" /></div>
                    <div>
                        <p className="text-sm text-secondary">Total Members</p>
                        <p className="text-xl font-bold text-primary">{totalMembers}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-full"><KanbanIcon className="w-6 h-6 text-red-500" /></div>
                    <div>
                        <p className="text-sm text-secondary">All Open Tasks</p>
                        <p className="text-xl font-bold text-primary">{openTasks}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) {
        return <div>Loading dashboard...</div>;
    }

    const { currentUser, projects, users } = context;
    
    const xpForNextLevel = currentUser.level * 100;
    const currentLevelXp = (currentUser.level - 1) * 100;
    const xpProgress = Math.max(0, Math.min(100, ((currentUser.xp - currentLevelXp) / (xpForNextLevel - currentLevelXp)) * 100));
    
    const totalPages = projects.reduce((acc, p) => acc + p.pages.length, 0);
    const totalTasks = projects.reduce((acc, p) => acc + p.kanban.columns.reduce((colAcc, c) => colAcc + c.cards.length, 0), 0);

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome back, {currentUser.name}!</h1>
            <p className="text-lg text-secondary mb-8">Here's a look at your workspace today.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stat Cards */}
                <div className="bg-primary p-6 rounded-xl border border-primary shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-full"><TrophyIcon className="w-6 h-6 text-yellow-500" /></div>
                    <div>
                        <p className="text-sm text-secondary">Your Rank</p>
                        <p className="text-xl font-bold text-primary">{currentUser.title}</p>
                    </div>
                </div>
                <div className="bg-primary p-6 rounded-xl border border-primary shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full"><DocumentIcon className="w-6 h-6 text-blue-500" /></div>
                    <div>
                        <p className="text-sm text-secondary">Total Pages</p>
                        <p className="text-xl font-bold text-primary">{totalPages}</p>
                    </div>
                </div>
                <div className="bg-primary p-6 rounded-xl border border-primary shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full"><KanbanIcon className="w-6 h-6 text-indigo-500" /></div>
                    <div>
                        <p className="text-sm text-secondary">Open Tasks</p>
                        <p className="text-xl font-bold text-primary">{totalTasks}</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-primary p-6 rounded-xl border border-primary shadow-sm lg:col-span-2">
                    <h2 className="text-xl font-bold text-primary mb-4">Team Activity</h2>
                    <TeamActivityChart users={users} projects={projects} />
                </div>
                <div className="space-y-6">
                    <div className="bg-primary p-6 rounded-xl border border-primary shadow-sm">
                         <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-primary">Level {currentUser.level}</p>
                            <p className="text-sm text-secondary">{currentUser.xp} / {xpForNextLevel} XP</p>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                           <div className="bg-accent h-2.5 rounded-full" style={{width: `${xpProgress}%`}}></div>
                        </div>
                    </div>
                    {currentUser.role === 'Owner' && <OwnerOverview projects={projects} />}
                </div>
            </div>


            {currentUser.badges.length > 0 && (
                 <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Your Badges</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentUser.badges.map(badge => <BadgeDisplay key={badge.id} badge={badge} />)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;