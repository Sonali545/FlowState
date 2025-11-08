import React, { useState, useContext } from 'react';
import { AppContext } from '../App';

interface NewProjectModalProps {
    onClose: () => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose }) => {
    const context = useContext(AppContext);
    const [name, setName] = useState('');

    const handleCreate = () => {
        if (name.trim() && context) {
            context.createProject(name.trim());
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-primary rounded-lg shadow-xl w-full max-w-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-primary">Create New Project</h2>
                <div className="mb-4">
                    <label htmlFor="project-name" className="block text-sm font-medium text-secondary mb-1">Project Name</label>
                    <input
                        type="text"
                        id="project-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Q4 Product Launch"
                        autoFocus
                        className="w-full px-3 py-2 border border-primary bg-primary text-primary rounded-md focus:outline-none focus:ring-2 ring-accent"
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-secondary text-primary rounded-md hover:bg-hover">Cancel</button>
                    <button onClick={handleCreate} disabled={!name.trim()} className="px-4 py-2 bg-accent text-accent rounded-md hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed">Create Project</button>
                </div>
            </div>
        </div>
    );
};

export default NewProjectModal;
