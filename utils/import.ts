// A basic markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
    let html = markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/^\s*[-*] (.*)/gim, '<ul><li>$1</li></ul>') // Basic lists, needs improvement for multi-line
        .replace(/<\/ul>\s*<ul>/g, '') // Merge consecutive lists
        .replace(/\n/g, '<br>'); // Convert newlines to breaks

    // Wrap non-tag content in paragraphs
    return html.split('<br><br>').map(p => {
        if (p.startsWith('<h') || p.startsWith('<ul')) return p;
        return `<p>${p}</p>`;
    }).join('');
};

export const importMarkdownFile = (onFileLoaded: (title: string, content: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md, text/markdown';
    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const markdownContent = event.target?.result as string;
                const htmlContent = markdownToHtml(markdownContent);
                const title = file.name.replace(/\.md$/, '');
                onFileLoaded(title, htmlContent);
            };
            reader.readAsText(file);
        }
    };
    input.click();
};