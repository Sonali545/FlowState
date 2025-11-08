import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { THEMES } from '../constants';
import type { Theme } from '../types';
import { PlusIcon, XIcon } from './icons';
import ThemeEditor from './ThemeEditor';

interface ThemeSwitcherProps {
    onClose: () => void;
}

const ThemePreview: React.FC<{ theme: Theme }> = ({ theme }) => (
    <div className="flex space-x-1 p-1">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors['--bg-primary'] }}></div>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors['--bg-secondary'] }}></div>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors['--text-primary'] }}></div>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors['--accent-primary'] }}></div>
    </div>
);

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onClose }) => {
    const context = useContext(AppContext);
    const [editingTheme, setEditingTheme] = useState<Theme | null>(null);

    if (!context) return null;

    const { activeTheme, setActiveTheme, customThemes } = context;

    const handleCreateNew = () => {
        const newTheme: Theme = {
            id: `custom-${Date.now()}`,
            name: 'My New Theme',
            colors: THEMES[0].colors, // Start from light theme
        };
        setEditingTheme(newTheme);
    };

    if (editingTheme) {
        return <ThemeEditor theme={editingTheme} onClose={() => setEditingTheme(null)} />;
    }

    const allThemes = [...THEMES, ...customThemes];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-primary rounded-lg shadow-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-primary">Appearance</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-hover">
                        <XIcon className="w-6 h-6 text-secondary" />
                    </button>
                </div>
                
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-secondary uppercase">Themes</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {allThemes.map(theme => (
                            <div 
                                key={theme.id}
                                onClick={() => setActiveTheme(theme)}
                                className={`p-4 border rounded-md cursor-pointer ${activeTheme.id === theme.id ? 'border-accent ring-2 ring-accent' : 'border-primary'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-primary">{theme.name}</span>
                                    <ThemePreview theme={theme} />
                                </div>
                            </div>
                        ))}
                    </div>
                     <h3 className="text-sm font-semibold text-secondary uppercase pt-4">Custom</h3>
                     <button onClick={handleCreateNew} className="w-full p-4 border-2 border-dashed border-primary rounded-md flex items-center justify-center gap-2 text-secondary hover:border-accent hover:text-accent">
                        <PlusIcon className="w-5 h-5" />
                        Create New Theme
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
