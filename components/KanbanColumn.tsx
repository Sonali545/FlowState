import React, { useState } from 'react';
import type { KanbanColumn, KanbanCard } from '../types';
import KanbanCardComponent from './KanbanCard';
import { PlusIcon } from './icons';

interface KanbanColumnProps {
  column: KanbanColumn;
  isReadOnly: boolean;
  onDragStart: (cardId: string, fromColumnId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (toColumnId: string) => void;
  onAddCard: (columnId: string, title: string) => void;
  onUpdateCard: (columnId: string, cardId: string, updates: Partial<Omit<KanbanCard, 'id'>>) => void;
}

const AddCardForm: React.FC<{ columnId: string; onAddCard: (columnId: string, title: string) => void; onCancel: () => void; }> = ({ columnId, onAddCard, onCancel }) => {
    const [title, setTitle] = useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const handleSubmit = () => {
        if (title.trim()) {
            onAddCard(columnId, title.trim());
            setTitle('');
            onCancel();
        }
    };
    
    return (
        <div className="mt-2">
            <textarea
                ref={textareaRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this card..."
                className="w-full p-2 rounded-md border border-primary bg-primary text-primary focus:outline-none focus:ring-2 ring-accent-secondary text-sm"
                rows={3}
            />
            <div className="flex items-center gap-2 mt-2">
                <button onClick={handleSubmit} className="px-3 py-1.5 bg-accent text-accent text-sm font-semibold rounded-md hover:bg-accent-hover">Add card</button>
                <button onClick={onCancel} className="px-3 py-1.5 text-sm font-medium text-secondary hover:bg-hover rounded-md">Cancel</button>
            </div>
        </div>
    );
};

const KanbanColumnComponent: React.FC<KanbanColumnProps> = ({ column, isReadOnly, onDragStart, onDragOver, onDrop, onAddCard, onUpdateCard }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(column.id);
      }}
      className="w-80 flex-shrink-0 bg-secondary rounded-xl p-1 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4 px-2 pt-2">
        <h2 className="font-semibold text-primary">{column.title}</h2>
        <span className="text-sm font-medium text-secondary bg-primary rounded-full px-2 py-0.5">{column.cards.length}</span>
      </div>
      <div className="space-y-3 min-h-[100px] overflow-y-auto px-2 pb-2 flex-1">
        {column.cards.map(card => (
          <KanbanCardComponent
            key={card.id}
            card={card}
            isReadOnly={isReadOnly}
            columnId={column.id}
            onDragStart={(cardId) => onDragStart(cardId, column.id)}
            onUpdate={(updates) => onUpdateCard(column.id, card.id, updates)}
          />
        ))}
      </div>
      {!isReadOnly && (
        <div className="p-2">
            {isAdding ? (
                <AddCardForm columnId={column.id} onAddCard={onAddCard} onCancel={() => setIsAdding(false)} />
            ) : (
                <button onClick={() => setIsAdding(true)} className="w-full flex items-center gap-2 p-2 rounded-md text-sm font-medium text-secondary hover:bg-hover">
                    <PlusIcon className="w-4 h-4"/>
                    Add a card
                </button>
            )}
        </div>
      )}
    </div>
  );
};

export default KanbanColumnComponent;
