import React, { useContext } from 'react';
import { AppContext } from '../App';
import { TrophyIcon } from './icons';

const Leaderboard: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) {
        return <div>Loading leaderboard...</div>;
    }

    const { users, currentUser } = context;
    const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

    const rankColors = [
        'text-yellow-500', // 1st
        'text-gray-400',   // 2nd
        'text-yellow-600'  // 3rd
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <TrophyIcon className="w-10 h-10 text-yellow-500" />
                <div>
                    <h1 className="text-3xl font-bold text-primary">Leaderboard</h1>
                    <p className="text-lg text-secondary">See who's making the biggest impact.</p>
                </div>
            </div>

            <div className="bg-primary rounded-xl border border-primary shadow-sm">
                <ul className="divide-y divide-primary">
                    {sortedUsers.map((user, index) => (
                        <li key={user.id} className={`p-4 flex items-center justify-between ${user.id === currentUser.id ? 'bg-secondary' : ''}`}>
                            <div className="flex items-center gap-4">
                                <span className={`text-xl font-bold w-8 text-center ${rankColors[index] || 'text-secondary'}`}>
                                    {index + 1}
                                </span>
                                <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-semibold text-primary">{user.name}</p>
                                    <p className="text-sm text-secondary">
                                        Level {user.level} - {user.title}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg" style={{color: 'var(--accent-secondary)'}}>{user.xp} XP</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Leaderboard;