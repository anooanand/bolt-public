import React, { useState } from 'react';

export const TextTypeAnalysisComponent = ({ content, textType }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeTextType = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/nsw-text-type-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          textType
        })
      });
      const result = await response.json();
      if (result.success) {
        setAnalysis(result);
      } else {
        setError(result.message || 'Failed to analyze text type');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Text type analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-type-analysis">
      <button onClick={analyzeTextType} disabled={loading || !content}>
        {loading ? 'Analyzing...' : 'Analyze Text Type'}
      </button>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      {analysis && (
        <div className="analysis-results">
          <h3>Text Type Analysis Results</h3>
          <div className="adherence-score">
            <p>Adherence Score: {analysis.adherenceScore}/10</p>
          </div>
          <div className="text-type-features">
            <h4>Text Type Features</h4>
            <div className="present-features">
              <h5>Present:</h5>
              <ul>
                {analysis.textTypeFeatures?.present?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="missing-features">
              <h5>Missing:</h5>
              <ul>
                {analysis.textTypeFeatures?.missing?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="suggestions">
            <h4>Specific Suggestions</h4>
            <ul>
              {analysis.specificSuggestions?.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
