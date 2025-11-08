import React, { useContext } from 'react';
import { AppContext } from '../App';
import { XIcon } from './icons';

interface NotificationsPanelProps {
    onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
    const context = useContext(AppContext);

    if (!context) return null;

    const { currentUser, users } = context;

    return (
        <div className="absolute top-full right-0 mt-2 w-80 bg-primary rounded-lg shadow-lg border border-primary z-20">
            <div className="p-3 border-b border-primary flex justify-between items-center">
                <h3 className="font-semibold text-primary">Notifications</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-hover">
                    <XIcon className="w-5 h-5 text-secondary" />
                </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {currentUser.mentions.length > 0 ? (
                    <ul>
                        {currentUser.mentions.map(mention => {
                             const fromUser = users.find(u => u.id === mention.fromUserId);
                             return (
                                <li key={mention.id} className={`p-3 border-b border-primary ${mention.read ? 'opacity-70' : 'bg-secondary'}`}>
                                    <div className="flex items-start gap-3">
                                        <img src={fromUser?.avatarUrl} alt={fromUser?.name} className="w-8 h-8 rounded-full"/>
                                        <div>
                                            <p className="text-sm text-primary">
                                                <span className="font-semibold">{fromUser?.name}</span> mentioned you in <span className="font-semibold">{mention.location}</span>
                                            </p>
                                            <p className="text-sm text-secondary mt-1 italic">"{mention.text}"</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="p-4 text-center text-secondary text-sm">No new notifications.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationsPanel;