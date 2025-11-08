import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../App';
import { PaperAirplaneIcon, XIcon } from './icons';

interface ChatProps {
    isVisible: boolean;
    onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ isVisible, onClose }) => {
    const context = useContext(AppContext);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [context?.activeProject.chatHistory]);
    
    if (!context) return null;

    const { activeProject, addChatMessage } = context;

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            addChatMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <div className={`fixed top-0 right-0 h-full bg-primary border-l border-primary shadow-lg z-40 transition-transform duration-300 ease-in-out flex flex-col ${isVisible ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '350px' }}>
            <div className="p-4 border-b border-primary flex justify-between items-center">
                <h2 className="font-semibold text-lg text-primary">Project Chat</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-hover">
                    <XIcon className="w-5 h-5 text-secondary" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeProject.chatHistory.map(chat => (
                    <div key={chat.id} className="flex items-start gap-3">
                        <img src={chat.user.avatarUrl} alt={chat.user.name} className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="flex items-baseline gap-2">
                                <p className="font-semibold text-sm text-primary">{chat.user.name}</p>
                                <p className="text-xs text-secondary">{chat.timestamp}</p>
                            </div>
                            <p className="text-sm text-primary bg-secondary p-2 rounded-lg">{chat.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-primary">
                <form onSubmit={handleSendMessage} className="relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full pl-3 pr-10 py-2 border border-primary bg-primary text-primary rounded-lg focus:outline-none focus:ring-2 ring-accent"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-secondary hover:text-accent">
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;