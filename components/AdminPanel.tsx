import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { UsersIcon, ShieldCheckIcon } from './icons';
import type { User } from '../types';

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'members' | 'audit'>('members');
    const context = useContext(AppContext);

    if (!context) return null;

    const { users, updateUserRole, activeProject } = context;

    const handleRoleChange = (userId: string, role: User['role']) => {
        updateUserRole(userId, role);
    };
    
    const activeTabClasses = 'border-accent text-accent';
    const inactiveTabClasses = 'border-transparent text-secondary hover:text-primary hover:border-primary';

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <ShieldCheckIcon className="w-10 h-10 text-accent" />
                <div>
                    <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
                    <p className="text-lg text-secondary">Manage your project members and view activity logs.</p>
                </div>
            </div>

            <div className="border-b border-primary mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('members')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'members' ? activeTabClasses : inactiveTabClasses}`}>
                        Team Members
                    </button>
                    <button onClick={() => setActiveTab('audit')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'audit' ? activeTabClasses : inactiveTabClasses}`}>
                        Audit Log
                    </button>
                </nav>
            </div>

            {activeTab === 'members' && (
                <div className="bg-primary rounded-xl border border-primary shadow-sm">
                    <ul className="divide-y divide-primary">
                        {users.map(user => (
                            <li key={user.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-primary">{user.name}</p>
                                        <p className="text-sm text-secondary">{user.title}</p>
                                    </div>
                                </div>
                                <div>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value as User['role'])}
                                        className="rounded-md border-primary shadow-sm focus:border-accent focus:ring ring-accent ring-opacity-50 bg-primary text-primary"
                                    >
                                        <option>Owner</option>
                                        <option>Admin</option>
                                        <option>Editor</option>
                                        <option>Viewer</option>
                                    </select>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {activeTab === 'audit' && (
                 <div className="bg-primary rounded-xl border border-primary shadow-sm">
                    <ul className="divide-y divide-primary">
                        {activeProject.auditLog.map(log => (
                             <li key={log.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={log.user.avatarUrl} alt={log.user.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm text-primary">
                                            <span className="font-semibold">{log.user.name}</span> {log.action.toLowerCase()} <span className="font-semibold">{log.target}</span>.
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm text-secondary">{log.timestamp}</span>
                             </li>
                        ))}
                    </ul>
                 </div>
            )}
        </div>
    );
};

export default AdminPanel;