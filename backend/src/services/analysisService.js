const Sentiment = require('sentiment');
const readability = require('text-readability');

const sentimentAnalyzer = new Sentiment();

const getTopHashtags = (text = '') =>
  (text.match(/#[\p{L}0-9_]+/giu) || []).map((tag) => tag.toLowerCase());

const getTopMentions = (text = '') =>
  (text.match(/@[\p{L}0-9_]+/giu) || []).map((tag) => tag.toLowerCase());

const summarizeText = (text = '') => {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length === 0) {
    return '';
  }

  if (sentences.length === 1) {
    return sentences[0];
  }

  return sentences.slice(0, 2).join(' ');
};

const buildSuggestions = ({ wordCount, readabilityScore, sentimentScore, hashtags, ctaPresent }) => {
  const suggestions = [];

  if (wordCount < 15) {
    suggestions.push('Add more context so the audience immediately understands the value.');
  }

  if (wordCount > 180) {
    suggestions.push('Tighten the copy. Shorter posts (under 150 words) perform better on most platforms.');
  }

  if (!ctaPresent) {
    suggestions.push('Include a clear call-to-action (e.g., question, link, or next step).');
  }

  if (!hashtags.length) {
    suggestions.push('Add 1–3 relevant hashtags to boost discoverability.');
  }

  if (readabilityScore < 50) {
    suggestions.push('Aim for a conversational tone. Short sentences and simpler words improve readability.');
  }

  if (Math.abs(sentimentScore) < 0.1) {
    suggestions.push('Consider adding an emotional hook to make the post feel more relatable.');
  }

  suggestions.push('Experiment with an eye-catching emoji or line-break formatting for scannability.');

  return suggestions;
};

const analyzeContent = (text = '') => {
  const cleanText = text.trim();
  const words = cleanText ? cleanText.split(/\s+/) : [];
  const wordCount = words.length;
  const charCount = cleanText.length;

  const sentimentResult = sentimentAnalyzer.analyze(cleanText);
  const sentimentScore = sentimentResult.comparative || 0;

  let readabilityScore = 0;
  try {
    readabilityScore = readability.fleschReadingEase(cleanText);
  } catch (error) {
    readabilityScore = 0;
  }

  const hashtags = getTopHashtags(cleanText);
  const mentions = getTopMentions(cleanText);
  const ctaPresent = /\?|visit|learn more|sign up|download|check out|join/gi.test(cleanText);

  const summary = summarizeText(cleanText);

  return {
    metrics: {
      wordCount,
      charCount,
      sentimentScore: Number(sentimentScore.toFixed(2)),
      readabilityScore: Math.round(readabilityScore),
      hashtags,
      mentions,
    },
    summary,
    suggestions: buildSuggestions({ wordCount, readabilityScore, sentimentScore, hashtags, ctaPresent }),
  };
};

module.exports = { analyzeContent };


