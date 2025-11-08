import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import type { SearchResult } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { SearchIcon, DocumentIcon, KanbanIcon } from './icons';

interface GlobalSearchProps {
    onClose: () => void;
}

const ResultIcon: React.FC<{type: 'Page' | 'Task'}> = ({ type }) => {
    if (type === 'Page') return <DocumentIcon className="w-5 h-5 text-secondary" />;
    if (type === 'Task') return <KanbanIcon className="w-5 h-5 text-secondary" />;
    return null;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onClose }) => {
    const context = useContext(AppContext);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const debouncedQuery = useDebounce(query, 200);

    useEffect(() => {
        if (debouncedQuery && context) {
            setResults(context.search(debouncedQuery));
        } else {
            setResults([]);
        }
    }, [debouncedQuery, context]);

    const handleResultClick = (result: SearchResult) => {
        result.action();
        onClose();
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if(event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 pt-20"
            onClick={onClose}
        >
            <div 
                className="bg-primary rounded-lg shadow-xl w-full max-w-2xl" 
                role="dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                        type="text"
                        placeholder="Search for pages, tasks, and more..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                        className="w-full text-lg p-4 pl-12 border-b border-primary bg-primary text-primary focus:outline-none"
                    />
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((result) => (
                                <li key={result.id}>
                                    <button onClick={() => handleResultClick(result)} className="w-full text-left flex items-center gap-4 p-4 hover:bg-hover">
                                        <ResultIcon type={result.type} />
                                        <div>
                                            <p className="font-medium text-primary">{result.title}</p>
                                            <p className="text-sm text-secondary">{result.context}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                       query && <p className="p-4 text-center text-secondary">No results found for "{query}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;