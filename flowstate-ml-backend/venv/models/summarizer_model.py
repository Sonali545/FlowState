from transformers import pipeline

_summarizer = None

def summarize_text(text: str):
    global _summarizer
    if not text or len(text.split()) < 40:
        return text
    if _summarizer is None:
        _summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = _summarizer(text, max_length=100, min_length=25, do_sample=False)
    return summary[0]["summary_text"]
