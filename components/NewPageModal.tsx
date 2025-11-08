import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { pageTemplates } from '../constants';
import type { PageTemplate } from '../types';

interface NewPageModalProps {
    onClose: () => void;
}

const NewPageModal: React.FC<NewPageModalProps> = ({ onClose }) => {
    const context = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate>(pageTemplates[0]);

    const handleCreatePage = () => {
        if (title.trim() && context) {
            context.createPage(title.trim(), selectedTemplate.content);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-primary rounded-lg shadow-xl w-full max-w-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-primary">Create a New Page</h2>
                
                <div className="mb-4">
                    <label htmlFor="page-title" className="block text-sm font-medium text-secondary mb-1">Page Title</label>
                    <input
                        type="text"
                        id="page-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Q3 Marketing Strategy"
                        className="w-full px-3 py-2 border border-primary bg-primary text-primary rounded-md focus:outline-none focus:ring-2 ring-accent"
                    />
                </div>

                <div className="mb-6">
                    <p className="block text-sm font-medium text-secondary mb-2">Choose a template</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pageTemplates.map(template => (
                            <div 
                                key={template.id} 
                                onClick={() => setSelectedTemplate(template)}
                                className={`p-4 border rounded-md cursor-pointer ${selectedTemplate.id === template.id ? 'border-accent ring-2 ring-accent' : 'border-primary'}`}
                            >
                                <h3 className="font-semibold text-primary">{template.name}</h3>
                                <p className="text-sm text-secondary">{template.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-secondary text-primary rounded-md hover:bg-hover">Cancel</button>
                    <button onClick={handleCreatePage} disabled={!title.trim()} className="px-4 py-2 bg-accent text-accent rounded-md hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed">Create Page</button>
                </div>
            </div>
        </div>
    );
};

export default NewPageModal;