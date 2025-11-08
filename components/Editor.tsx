import React, { useState, useRef, useEffect, useContext } from 'react';
import type { Page, StickyNote as StickyNoteType } from '../types';
import { summarizeText } from '../services/geminiService';
import { SparklesIcon, FileTextIcon, ListIcon, TypeIcon, StickyNoteIcon } from './icons';
import { AppContext } from '../App';
import { exportAsMarkdown, exportAsPdf } from '../utils/export';
import LiveCollaboration from './LiveCollaboration';
import StickyNote from './StickyNote';

interface EditorProps {
  page: Page;
}

const SlashCommandMenu: React.FC<{ onSelect: (command: string, value?: string) => void; position: { top: number, left: number } }> = ({ onSelect, position }) => {
    const commands = [
        { cmd: 'formatBlock', val: 'h1', label: 'Heading 1', icon: <TypeIcon/> },
        { cmd: 'formatBlock', val: 'h2', label: 'Heading 2', icon: <TypeIcon className="w-4 h-4" /> },
        { cmd: 'formatBlock', val: 'p', label: 'Paragraph', icon: <FileTextIcon /> },
        { cmd: 'insertUnorderedList', label: 'Bulleted List', icon: <ListIcon /> },
        { cmd: 'insertOrderedList', label: 'Numbered List', icon: <ListIcon /> },
    ];
    return (
        <div className="absolute z-10 w-48 bg-primary rounded-md shadow-lg border border-primary" style={{ top: position.top, left: position.left }}>
            <div className="p-1">
                {commands.map(({ cmd, val, label, icon }) => (
                     <button key={label} onClick={() => onSelect(cmd, val)} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-left text-primary hover:bg-hover rounded-md">
                        {icon} {label}
                    </button>
                ))}
            </div>
        </div>
    );
};


const Editor: React.FC<EditorProps> = ({ page }) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(page.content);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const context = useContext(AppContext);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [isHeatmapVisible, setIsHeatmapVisible] = useState(false);
  
  const isReadOnly = context?.isReadOnly ?? false;

  useEffect(() => {
    // When the page prop changes, React remounts this component because of the key in MainLayout.
    // This effect runs on mount, setting the initial content for the editor.
    // By setting innerHTML directly, we treat it as an uncontrolled component during user editing,
    // which prevents React from resetting the cursor position on re-renders.
    if (editorRef.current) {
        editorRef.current.innerHTML = page.content;
    }
    setContent(page.content);
    setSummary(null);
  }, [page]);
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if(isReadOnly) return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const text = range.startContainer.textContent || '';
        
        if (text.slice(range.startOffset - 1, range.startOffset) === '/') {
            const rect = range.getBoundingClientRect();
            setSlashMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
            setShowSlashMenu(true);
        } else {
            setShowSlashMenu(false);
        }
    }
    // Sync the DOM content back to React state so other features can use it.
    setContent(e.currentTarget.innerHTML);
  };
  
  const handleSlashCommand = (command: string, value?: string) => {
    setShowSlashMenu(false);
    
    const selection = window.getSelection();
    if(selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if((range.startContainer.textContent || '').charAt(range.startOffset - 1) === '/') {
            range.setStart(range.startContainer, range.startOffset - 1);
            range.setEnd(range.startContainer, range.startOffset);
            range.deleteContents();
        }
    }

    applyFormat(command, value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (isReadOnly) return;
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');

    const figmaRegex = /https:\/\/www\.figma\.com\/(file|proto)\/([^\/?]+)/;
    const loomRegex = /https:\/\/www\.loom\.com\/share\/([a-fA-F0-9]+)/;
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^&?]+)/;
    
    let embedHtml = '';

    if (figmaRegex.test(text)) {
        const url = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(text)}`;
        embedHtml = `<p><iframe style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px;" width="100%" height="450" src="${url}" allowfullscreen></iframe></p>`;
    } else if (loomRegex.test(text)) {
        const videoId = text.match(loomRegex)?.[1];
        if (videoId) {
            embedHtml = `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/${videoId}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"></iframe></div>`;
        }
    } else if (youtubeRegex.test(text)) {
        const videoId = text.match(youtubeRegex)?.[1];
        if(videoId) {
            embedHtml = `<p><iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 8px;"></iframe></p>`;
        }
    }

    if (embedHtml) {
        document.execCommand('insertHTML', false, embedHtml);
    } else {
        document.execCommand('insertText', false, text);
    }
  };


  const handleSummarize = async () => {
    if (editorRef.current) {
      setIsSummarizing(true);
      setSummary(null);
      const textToSummarize = editorRef.current.innerText;
      try {
        const result = await summarizeText(textToSummarize);
        setSummary(result);
        if (context) {
          context.addXp(context.currentUser.id, 25, 'AI Summary Generated');
        }
      } catch (error) {
        setSummary("Failed to generate summary.");
      } finally {
        setIsSummarizing(false);
      }
    }
  };

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };
  
  const addStickyNote = () => {
    if (context) {
        context.addStickyNote(page.id, {
            content: 'New note...',
            authorId: context.currentUser.id,
            position: { x: 50, y: 50 }
        })
    }
  }

  return (
    <div className="max-w-4xl mx-auto relative" ref={editorContainerRef}>
        <div className="flex justify-between items-center mb-4 no-print">
            <h1 className="text-4xl font-bold text-primary">{page.title}</h1>
            {!isReadOnly && (
            <div className="flex items-center gap-2">
                 <button onClick={() => exportAsMarkdown(page.title, content)} className="px-3 py-2 text-sm font-semibold bg-primary border border-primary rounded-md hover:bg-hover">Export MD</button>
                 <button onClick={exportAsPdf} className="px-3 py-2 text-sm font-semibold bg-primary border border-primary rounded-md hover:bg-hover">Export PDF</button>
                <button
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-accent font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SparklesIcon className="w-5 h-5" />
                  {isSummarizing ? 'Summarizing...' : 'AI Summarize'}
                </button>
            </div>
            )}
        </div>

        {summary && (
            <div className="p-4 mb-6 bg-secondary border border-primary rounded-lg no-print">
                <h3 className="font-bold text-primary mb-2">✨ Summary</h3>
                <div className="prose prose-sm text-secondary whitespace-pre-wrap">{summary}</div>
            </div>
        )}
      {showSlashMenu && !isReadOnly && <SlashCommandMenu onSelect={handleSlashCommand} position={slashMenuPosition} />}
      <div className="bg-primary rounded-lg shadow-sm border border-primary relative">
        <LiveCollaboration editorRef={editorContainerRef} isHeatmapVisible={isHeatmapVisible} />

        {!isReadOnly && (
        <div className="p-2 border-b border-primary flex items-center space-x-2 bg-secondary rounded-t-lg no-print">
          <button onClick={() => applyFormat('bold')} className="px-3 py-1 text-sm font-bold rounded hover:bg-hover">B</button>
          <button onClick={() => applyFormat('italic')} className="px-3 py-1 text-sm italic rounded hover:bg-hover">I</button>
          <button onClick={() => applyFormat('formatBlock', 'h1')} className="px-3 py-1 text-sm font-semibold rounded hover:bg-hover">H1</button>
          <button onClick={() => applyFormat('formatBlock', 'h2')} className="px-3 py-1 text-sm font-semibold rounded hover:bg-hover">H2</button>
          <button onClick={() => applyFormat('insertUnorderedList')} className="px-3 py-1 text-sm rounded hover:bg-hover">UL</button>
          <div className="w-px h-5 bg-primary"></div>
          <button onClick={addStickyNote} title="Add Sticky Note" className="p-1.5 rounded hover:bg-hover"><StickyNoteIcon className="w-5 h-5 text-secondary" /></button>
          <button onClick={() => setIsHeatmapVisible(!isHeatmapVisible)} className={`p-1.5 rounded ${isHeatmapVisible ? 'bg-red-200' : 'hover:bg-hover'}`} title="Toggle Presence Heatmap">
              <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.771-2.582 6.877-6 7.688a4.5 4.5 0 01-1.93-1.031zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>
        )}
        <div
          ref={editorRef}
          contentEditable={!isReadOnly}
          suppressContentEditableWarning={true}
          className={`p-8 min-h-[500px] prose max-w-none relative text-primary ${isReadOnly ? '' : 'focus:outline-none'}`}
          onInput={handleInput}
          onPaste={handlePaste}
        />
      </div>
      {(page.stickyNotes || []).map(note => (
        <StickyNote key={note.id} note={note} pageId={page.id} />
      ))}
    </div>
  );
};

export default Editor;
