import React, { useState, useRef, useEffect, useContext } from 'react';
import type { KanbanCard } from '../types';
import { AppContext } from '../App';
import { FaceSmileIcon, GitHubIcon, PlusIcon, ChevronDownIcon } from './icons';

interface KanbanCardProps {
  card: KanbanCard;
  isReadOnly: boolean;
  columnId: string;
  onDragStart: (cardId: string) => void;
  onUpdate: (updates: Partial<Omit<KanbanCard, 'id'>>) => void;
}

const priorityColors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700',
}

const KanbanCardComponent: React.FC<KanbanCardProps> = ({ card, isReadOnly, columnId, onDragStart, onUpdate }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [description, setDescription] = useState(card.description);
  const [isEditingGithub, setIsEditingGithub] = useState(false);
  const [githubUrl, setGithubUrl] = useState(card.githubIssueUrl || '');
  const context = useContext(AppContext);

  // New state for popovers and inline editing
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isPriorityPickerOpen, setIsPriorityPickerOpen] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [dueDate, setDueDate] = useState(card.dueDate);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descTextareaRef = useRef<HTMLTextAreaElement>(null);
  const githubInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const priorityPickerRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);


  const handleSaveTitle = () => {
    if (title.trim() && title.trim() !== card.title) {
        onUpdate({ title: title.trim() });
    }
    setIsEditingTitle(false);
  };
  
  const handleSaveDescription = () => {
    if (description.trim() !== card.description) {
      onUpdate({ description: description.trim() });
    }
    setIsEditingDesc(false);
  }

  const handleSaveGithubUrl = () => {
    if (githubUrl.trim() !== card.githubIssueUrl) {
      onUpdate({ githubIssueUrl: githubUrl.trim() });
    }
    setIsEditingGithub(false);
  }

  const handleSaveDate = () => {
    if (dueDate !== card.dueDate) {
        onUpdate({ dueDate });
    }
    setIsEditingDate(false);
  };

  useEffect(() => {
    if (isEditingTitle) titleInputRef.current?.focus();
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingDesc) descTextareaRef.current?.focus();
  }, [isEditingDesc]);
  
  useEffect(() => {
    if (isEditingGithub) githubInputRef.current?.focus();
  }, [isEditingGithub]);

  useEffect(() => {
    if (isEditingDate) dateInputRef.current?.focus();
  }, [isEditingDate]);
  
  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
      if (priorityPickerRef.current && !priorityPickerRef.current.contains(event.target as Node)) {
        setIsPriorityPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReaction = (emoji: string) => {
    context?.addReactionToCard(columnId, card.id, emoji);
  }

  const cursorClass = isReadOnly ? 'cursor-default' : 'cursor-pointer';
  const grabCursorClass = isReadOnly ? 'cursor-default' : 'cursor-grab active:cursor-grabbing';
  
  const EMOJI_OPTIONS = ['👍', '❤️', '🚀', '🎉', '🤔', '👀'];
  const PRIORITY_OPTIONS: Array<KanbanCard['priority']> = ['Low', 'Medium', 'High'];

  return (
    <div
      draggable={!isReadOnly}
      onDragStart={() => onDragStart(card.id)}
      className={`bg-primary rounded-lg p-3 shadow-sm border border-primary ${grabCursorClass} flex flex-col gap-3`}
    >
      <div>
          {isEditingTitle && !isReadOnly ? (
            <input 
                ref={titleInputRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSaveTitle} onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                className="w-full p-0 m-0 font-medium text-primary bg-transparent border-none focus:outline-none focus:ring-0" />
          ) : (
            <p onClick={() => !isReadOnly && setIsEditingTitle(true)} className={`font-medium text-primary ${cursorClass}`}>{card.title}</p>
          )}

          {isEditingDesc && !isReadOnly ? (
            <textarea
              ref={descTextareaRef} value={description} onChange={(e) => setDescription(e.target.value)}
              onBlur={handleSaveDescription} placeholder="Add a more detailed description..."
              className="w-full text-sm p-0 m-0 text-secondary bg-transparent border-none focus:outline-none focus:ring-0 resize-none" rows={3} />
          ) : (
            <p onClick={() => !isReadOnly && setIsEditingDesc(true)} className={`text-sm text-secondary ${cursorClass} whitespace-pre-wrap`}>
              {card.description || <span className="text-gray-400 italic">Add a description...</span>}
            </p>
          )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative">
             <button
                onClick={() => !isReadOnly && setIsPriorityPickerOpen(prev => !prev)}
                className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${priorityColors[card.priority]} ${!isReadOnly ? 'cursor-pointer' : ''}`}
                disabled={isReadOnly}
             >
                {card.priority}
                {!isReadOnly && <ChevronDownIcon className="w-3 h-3" />}
            </button>
            {isPriorityPickerOpen && (
                <div ref={priorityPickerRef} className="absolute top-full mt-2 bg-primary border border-primary rounded-md shadow-lg py-1 z-10 w-28">
                    {PRIORITY_OPTIONS.map(p => (
                        <button key={p} onClick={() => { onUpdate({ priority: p }); setIsPriorityPickerOpen(false); }} className="w-full text-left px-3 py-1.5 text-sm text-primary hover:bg-hover">
                            {p}
                        </button>
                    ))}
                </div>
            )}
        </div>
        {card.labels.map(label => (
          <span key={label} className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-full">{label}</span>
        ))}
      </div>

      <div className="relative flex items-center gap-2">
        {card.reactions.map(reaction => (
            <button key={reaction.emoji} onClick={() => !isReadOnly && handleReaction(reaction.emoji)} className={`px-2 py-0.5 rounded-full flex items-center gap-1 text-sm ${reaction.userIds.includes(context?.currentUser.id ?? '') ? 'bg-accent bg-opacity-30 border border-accent' : 'bg-secondary'}`}>
                <span>{reaction.emoji}</span>
                <span className="font-medium text-secondary">{reaction.userIds.length}</span>
            </button>
        ))}
         {!isReadOnly && (
            <button onClick={() => setIsEmojiPickerOpen(p => !p)} className="text-secondary hover:text-primary p-1 rounded-full hover:bg-hover"><FaceSmileIcon className="w-4 h-4" /></button>
         )}
         {isEmojiPickerOpen && (
            <div ref={emojiPickerRef} className="absolute top-full mt-2 bg-primary border border-primary rounded-lg shadow-lg p-2 flex gap-1 z-10">
                {EMOJI_OPTIONS.map(emoji => (
                    <button key={emoji} onClick={() => { handleReaction(emoji); setIsEmojiPickerOpen(false); }} className="p-1 rounded-full hover:bg-hover text-lg">
                        {emoji}
                    </button>
                ))}
            </div>
         )}
      </div>

      <div className="border-t border-primary pt-3">
        {isEditingGithub && !isReadOnly ? (
            <input ref={githubInputRef} type="text" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} onBlur={handleSaveGithubUrl} onKeyDown={e => e.key === 'Enter' && handleSaveGithubUrl()} placeholder="Paste GitHub issue URL..." className="w-full text-sm p-1 border border-primary bg-primary rounded" />
        ) : card.githubIssueUrl ? (
            <div className="flex items-center justify-between">
              <a href={card.githubIssueUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-secondary hover:text-accent truncate">
                  <GitHubIcon className="w-4 h-4" />
                  <span className="truncate">{card.githubIssueUrl.replace('https://github.com/', '')}</span>
              </a>
              <button className="text-xs px-2 py-1 bg-secondary rounded hover:bg-hover" onClick={() => context?.addWebhookToast('Simulating PR merge...')}>Simulate Merge</button>
            </div>
        ) : !isReadOnly && (
            <button onClick={() => setIsEditingGithub(true)} className="flex items-center gap-1 text-sm text-secondary hover:text-primary">
                <PlusIcon className="w-4 h-4" /> Link GitHub Issue
            </button>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        {isEditingDate && !isReadOnly ? (
             <input
                ref={dateInputRef}
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                onBlur={handleSaveDate}
                className="text-xs text-secondary bg-secondary p-1 rounded-md border-primary focus:ring-accent focus:border-accent"
            />
        ) : (
             <span onClick={() => !isReadOnly && setIsEditingDate(true)} className={`text-xs text-secondary ${!isReadOnly && 'cursor-pointer hover:text-primary'}`}>{card.dueDate}</span>
        )}
        {card.assignee && (
            <img src={card.assignee.avatarUrl} alt={card.assignee.name} title={card.assignee.name} className="w-7 h-7 rounded-full border-2 border-primary" />
        )}
      </div>
    </div>
  );
};

export default KanbanCardComponent;
