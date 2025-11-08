import React, { useState } from 'react';
import { SparklesIcon } from './icons';

const DevTools: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50 hover:bg-gray-700"
                title="Open DevTools"
            >
                <SparklesIcon className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-gray-100 p-4 rounded-lg shadow-lg z-50 w-64 text-sm border border-gray-700">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Dev Diagnostics</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="space-y-1">
                <p><strong>WS Status:</strong> <span className="text-green-400">Connected</span></p>
                <p><strong>Presence:</strong> <span className="text-green-400">3 users</span> (mock)</p>
                <p><strong>Sync Latency:</strong> <span className="text-green-400">25ms</span> (mock)</p>
                <p><strong>CRDT State:</strong> Synced</p>
            </div>
        </div>
    );
};

export default DevTools;