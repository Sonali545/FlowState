import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import type { Theme } from '../types';
import { XIcon } from './icons';

interface ThemeEditorProps {
    theme: Theme;
    onClose: () => void;
}

const colorProperties: { key: keyof Theme['colors']; label: string }[] = [
    { key: '--bg-primary', label: 'Primary Background' },
    { key: '--bg-secondary', label: 'Secondary Background' },
    { key: '--text-primary', label: 'Primary Text' },
    { key: '--text-secondary', label: 'Secondary Text' },
    { key: '--border-primary', label: 'Borders' },
    { key: '--accent-primary', label: 'Primary Accent' },
    { key: '--accent-secondary', label: 'Secondary Accent' },
    { key: '--accent-text', label: 'Accent Text' },
    { key: '--hover-primary', label: 'Hover Background' },
];

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, onClose }) => {
    const context = useContext(AppContext);
    const [editedTheme, setEditedTheme] = useState<Theme>(theme);
    
    useEffect(() => {
        // Apply preview on mount
        context?.setPreviewTheme(editedTheme);
        
        // Cleanup on unmount
        return () => {
            context?.setPreviewTheme(null);
        };
    }, []); // Run only once

    // Update preview in real time
    useEffect(() => {
        context?.setPreviewTheme(editedTheme);
    }, [editedTheme, context?.setPreviewTheme]);

    if (!context) return null;
    const { saveCustomTheme, setActiveTheme } = context;

    const handleColorChange = (key: keyof Theme['colors'], value: string) => {
        setEditedTheme(prev => ({
            ...prev,
            colors: {
                ...prev.colors,
                [key]: value,
            },
        }));
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTheme(prev => ({...prev, name: e.target.value }));
    }

    const handleSave = () => {
        saveCustomTheme(editedTheme);
        setActiveTheme(editedTheme);
        onClose();
    };
    
    const handleCancel = () => {
        onClose(); // This will trigger the cleanup effect in useEffect
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-primary rounded-lg shadow-xl w-full max-w-md p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">Theme Editor</h2>
                    <button onClick={handleCancel} className="p-1 rounded-full hover:bg-hover">
                        <XIcon className="w-6 h-6 text-secondary" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Theme Name</label>
                        <input
                            type="text"
                            value={editedTheme.name}
                            onChange={handleNameChange}
                            className="w-full px-3 py-2 border border-primary bg-primary text-primary rounded-md focus:outline-none focus:ring-2 ring-accent"
                        />
                    </div>
                    {colorProperties.map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between">
                            <label className="text-sm font-medium text-primary">{label}</label>
                            <input
                                type="color"
                                value={editedTheme.colors[key]}
                                onChange={(e) => handleColorChange(key, e.target.value)}
                                className="w-10 h-10 p-1 bg-primary border border-primary rounded-md cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={handleCancel} className="px-4 py-2 bg-secondary text-primary rounded-md hover:bg-hover">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-accent text-accent rounded-md hover:bg-accent-hover">Save Theme</button>
                </div>
            </div>
        </div>
    );
};

export default ThemeEditor;