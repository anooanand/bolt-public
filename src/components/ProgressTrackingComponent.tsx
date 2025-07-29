import React, { useState } from 'react';

export const ProgressTrackingComponent = ({ userId, assessmentData }) => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trackProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/nsw-progress-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, assessmentData }),
      });
      const result = await response.json();
      if (result.success) {
        setProgressData(result);
      } else {
        setError(result.message || 'Failed to track progress');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Progress tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="progress-tracking">
      <button onClick={trackProgress} disabled={loading || !userId || !assessmentData}>
        {loading ? 'Tracking Progress...' : 'Track Progress'}
      </button>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      {progressData && (
        <div className="progress-results">
          <h3>Progress Tracking Results</h3>
          <div className="readiness-indicator">
            <h4>Readiness Indicator: {progressData.readinessIndicator?.level}</h4>
            <p>Percentage: {progressData.readinessIndicator?.percentage}%</p>
            <p>Next Milestone: {progressData.readinessIndicator?.nextMilestone}</p>
          </div>
          <div className="progress-metrics">
            <h4>Progress Metrics</h4>
            <p>Overall Progress: {progressData.progressMetrics?.overallProgress?.toFixed(2)}%</p>
            <p>Band Level: {progressData.progressMetrics?.bandLevel}</p>
            <h5>Criteria Progress:</h5>
            <ul>
              <li>Ideas: {progressData.progressMetrics?.criteriaProgress?.ideas?.toFixed(2)}%</li>
              <li>Structure: {progressData.progressMetrics?.criteriaProgress?.structure?.toFixed(2)}%</li>
              <li>Language: {progressData.progressMetrics?.criteriaProgress?.language?.toFixed(2)}%</li>
              <li>Grammar: {progressData.progressMetrics?.criteriaProgress?.grammar?.toFixed(2)}%</li>
            </ul>
          </div>
          <div className="recommendations">
            <h4>Recommendations</h4>
            <h5>Focus Areas:</h5>
            <ul>
              {progressData.recommendations?.focusAreas?.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
            <h5>Practice Activities:</h5>
            <ul>
              {progressData.recommendations?.practiceActivities?.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            <p>Study Plan Phase: {progressData.recommendations?.studyPlan?.phase}</p>
            <p>Study Plan Duration: {progressData.recommendations?.studyPlan?.duration}</p>
          </div>
        </div>
      )}
    </div>
  );
};