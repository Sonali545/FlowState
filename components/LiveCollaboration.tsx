import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers } from '../constants';

const otherUsers = mockUsers.filter(u => u.id !== 'user-1').slice(0, 3);
const colors = ['#3B82F6', '#10B981', '#F59E0B'];

const LiveCollaboration: React.FC<{ editorRef: React.RefObject<HTMLElement>, isHeatmapVisible: boolean }> = ({ editorRef, isHeatmapVisible }) => {
    const [collaborators, setCollaborators] = useState(() =>
        otherUsers.map((user, i) => ({
            ...user,
            color: colors[i],
            position: { x: Math.random() * 500, y: Math.random() * 200 },
            isTyping: false,
            typingElement: null as HTMLElement | null,
        }))
    );
    const [heatmapData, setHeatmapData] = useState<{x:number, y:number, intensity:number}[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!editorRef.current) return;
            const editorRect = editorRef.current.getBoundingClientRect();
            
            setCollaborators(prev => prev.map(c => {
                const isStartingToType = !c.isTyping && Math.random() > 0.95;
                const isStoppingTyping = c.isTyping && Math.random() > 0.7;
                
                let typingElement = c.typingElement;

                if (isStartingToType) {
                    const paragraphs = Array.from(editorRef.current?.querySelectorAll('p, h1, h2, li') || []) as HTMLElement[];
                    if (paragraphs.length > 0) {
                        typingElement = paragraphs[Math.floor(Math.random() * paragraphs.length)];
                    }
                } else if (isStoppingTyping) {
                    typingElement = null;
                }
                
                // Add old element to heatmap when user stops typing
                if(isStoppingTyping && c.typingElement) {
                    const rect = c.typingElement.getBoundingClientRect();
                    setHeatmapData(prev => [...prev, {
                        x: rect.left - editorRect.left + rect.width / 2,
                        y: rect.top - editorRect.top + rect.height / 2,
                        intensity: Math.random()
                    }])
                }

                return {
                    ...c,
                    position: {
                        x: typingElement ? typingElement.offsetLeft + typingElement.offsetWidth : Math.random() * editorRect.width,
                        y: typingElement ? typingElement.offsetTop + 8 : Math.random() * editorRect.height,
                    },
                    isTyping: typingElement ? true : false,
                    typingElement,
                };
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, [editorRef]);
    
    useEffect(() => {
        collaborators.forEach(c => {
            if(c.typingElement) {
                c.typingElement.style.backgroundColor = `${c.color}1A`; // transparent highlight
            }
        });
        
        return () => {
             collaborators.forEach(c => {
                if(c.typingElement) c.typingElement.style.backgroundColor = '';
            });
        }
    }, [collaborators]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {isHeatmapVisible && heatmapData.map((point, i) => (
                <div key={i} className="absolute rounded-full" style={{
                    top: point.y, left: point.x,
                    width: 150, height: 150,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, rgba(255,0,0,${0.2 * point.intensity}) 0%, rgba(255,0,0,0) 70%)`
                }} />
            ))}
            
            {collaborators.map(c => (
                <motion.div
                    key={c.id}
                    animate={{ x: c.position.x, y: c.position.y }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="absolute"
                >
                    <div className="absolute w-0.5 h-5" style={{ backgroundColor: c.color }}>
                        <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-5 left-0 flex items-center gap-2 p-1 pr-2 rounded-full shadow"
                        style={{ backgroundColor: c.color }}
                    >
                        <img src={c.avatarUrl} className="w-5 h-5 rounded-full" />
                        <span className="text-xs text-white font-medium">{c.name}</span>
                    </motion.div>
                    
                    <AnimatePresence>
                    {c.isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-12 left-0 text-xs bg-gray-800 text-white px-2 py-1 rounded"
                        >
                            is typing...
                        </motion.div>
                    )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};

export default LiveCollaboration;
