import React, { useState } from 'react';

export const VocabularySophisticationComponent = ({ content }) => {
  const [vocabularyAnalysis, setVocabularyAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeVocabulary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        '/.netlify/functions/nsw-vocabulary-sophistication',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setVocabularyAnalysis(result);
      } else {
        setError(result.message || 'Failed to analyze vocabulary');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Vocabulary analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vocabulary-analysis">
      <button onClick={analyzeVocabulary} disabled={loading || !content}>
        {loading ? 'Analyzing Vocabulary...' : 'Analyze Vocabulary Sophistication'}
      </button>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      {vocabularyAnalysis && (
        <div className="vocabulary-results">
          <h3>Vocabulary Sophistication Analysis</h3>
          <div className="vocabulary-score">
            <p>Vocabulary Score: {vocabularyAnalysis.vocabularyScore}/10</p>
            <p>Sophistication Level: {vocabularyAnalysis.sophisticationLevel}</p>
          </div>
          <div className="vocabulary-metrics">
            <h4>Vocabulary Metrics</h4>
            <p>Total Words: {vocabularyAnalysis.vocabularyMetrics?.totalWords}</p>
            <p>Unique Words: {vocabularyAnalysis.vocabularyMetrics?.uniqueWords}</p>
            <p>Diversity Ratio: {vocabularyAnalysis.vocabularyMetrics?.diversityRatio}%</p>
            <p>Average Word Length: {vocabularyAnalysis.vocabularyMetrics?.averageWordLength}</p>
            <p>Complex Words: {vocabularyAnalysis.vocabularyMetrics?.complexWords}</p>
          </div>
          <div className="vocabulary-strengths">
            <h4>Strengths</h4>
            <ul>
              {vocabularyAnalysis.strengths?.sophisticatedWords?.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
          <div className="vocabulary-improvements">
            <h4>Improvements</h4>
            <ul>
              {vocabularyAnalysis.improvements?.basicWords?.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
          <div className="vocabulary-suggestions">
            <h4>Suggestions</h4>
            <ul>
              {vocabularyAnalysis.suggestions?.wordReplacements?.map((item, index) => (
                <li key={index}>
                  Replace "{item.original}" with: {item.suggestions.join(', ')} (Context: {item.context})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};