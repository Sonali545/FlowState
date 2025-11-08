// Basic HTML to Markdown conversion
const htmlToMarkdown = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html
    .replace(/<br\s*[\/]?>/gi, "\n") // Convert <br> to newlines
    .replace(/<\/p>/gi, "</p>\n") // Add newline after paragraphs
    .replace(/<\/h[1-6]>/gi, (match) => `${match}\n`); // Add newline after headings

  const simpleMarkdown = tempDiv.innerText.replace(/(\n\s*){3,}/g, '\n\n'); // Collapse multiple newlines

  return simpleMarkdown;
};

export const exportAsMarkdown = (title: string, htmlContent: string) => {
    const markdown = htmlToMarkdown(htmlContent);
    const blob = new Blob([`# ${title}\n\n${markdown}`], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const exportAsPdf = () => {
    // This is a simplified version that uses the browser's print functionality.
    // For a better experience, a library like jsPDF would be used.
    window.print();
};
