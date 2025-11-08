import React, { useState, useCallback, useContext } from 'react';
import type { KanbanCard } from '../types';
import KanbanColumnComponent from './KanbanColumn';
import { AppContext } from '../App';

const KanbanBoard: React.FC = () => {
  const context = useContext(AppContext);
  const [draggedItem, setDraggedItem] = useState<{ cardId: string; fromColumnId: string } | null>(null);

  if (!context) return null;

  const { activeProject, isReadOnly, moveKanbanCard, addKanbanCard, updateKanbanCard } = context;

  const handleDragStart = useCallback((cardId: string, fromColumnId: string) => {
    if (isReadOnly) return;
    setDraggedItem({ cardId, fromColumnId });
  }, [isReadOnly]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (isReadOnly) return;
    e.preventDefault();
  }, [isReadOnly]);

  const handleDrop = useCallback((toColumnId: string) => {
    if (!draggedItem || isReadOnly) return;
    moveKanbanCard(draggedItem.cardId, draggedItem.fromColumnId, toColumnId);
    setDraggedItem(null);
  }, [draggedItem, isReadOnly, moveKanbanCard]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Kanban Board</h1>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {activeProject.kanban.columns.map(column => (
          <KanbanColumnComponent
            key={column.id}
            column={column}
            isReadOnly={isReadOnly}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAddCard={addKanbanCard}
            onUpdateCard={updateKanbanCard}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
