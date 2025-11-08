from textblob import TextBlob

def detect_sentiment(text: str):
    if not text.strip():
        return "neutral"
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0.2:
        return "positive"
    elif polarity < -0.2:
        return "negative"
    return "neutral"
