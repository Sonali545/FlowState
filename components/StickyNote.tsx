import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../App';
import type { StickyNote as StickyNoteType } from '../types';

interface StickyNoteProps {
    note: StickyNoteType;
    pageId: string;
}

const StickyNote: React.FC<StickyNoteProps> = ({ note, pageId }) => {
    const context = useContext(AppContext);
    const [content, setContent] = useState(note.content);
    const author = context?.users.find(u => u.id === note.authorId);
    
    const handleDragEnd = (_event: any, info: any) => {
        context?.updateStickyNote(pageId, note.id, { position: { x: info.point.x, y: info.point.y } });
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleBlur = () => {
        if (content !== note.content) {
            context?.updateStickyNote(pageId, note.id, { content });
        }
    };
    
    if (!author) return null;

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            initial={{ x: note.position.x, y: note.position.y }}
            className="absolute z-20 w-52 h-52 p-3 bg-yellow-200 shadow-lg rounded-md flex flex-col cursor-grab active:cursor-grabbing"
            style={{ 
                boxShadow: '5px 5px 15px rgba(0,0,0,0.2)',
                transform: 'rotate(-2deg)'
             }}
        >
            <textarea
                value={content}
                onChange={handleContentChange}
                onBlur={handleBlur}
                className="flex-1 bg-transparent border-none focus:outline-none resize-none text-sm text-gray-800 font-medium placeholder-gray-500"
                placeholder="Type something..."
            />
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-yellow-300">
                <img src={author.avatarUrl} alt={author.name} className="w-5 h-5 rounded-full"/>
                <span className="text-xs font-semibold text-gray-700">{author.name}</span>
            </div>
        </motion.div>
    );
};

export default StickyNote;