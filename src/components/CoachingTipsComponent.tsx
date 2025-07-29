import React, { useState } from 'react';

export const CoachingTipsComponent = ({ content, textType, currentScore, focusArea }) => {
  const [coachingTips, setCoachingTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCoachingTips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        '/.netlify/functions/nsw-coaching-tips',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content, textType, currentScore, focusArea }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setCoachingTips(result);
      } else {
        setError(result.message || 'Failed to get coaching tips');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Coaching tips error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coaching-tips">
      <button onClick={getCoachingTips} disabled={loading || !content || !textType || currentScore === undefined || !focusArea}>
        {loading ? 'Getting Coaching Tips...' : 'Get Coaching Tips'}
      </button>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      {coachingTips && (
        <div className="coaching-results">
          <h3>Personalized Coaching Tips</h3>
          <p>Coaching Level: {coachingTips.coachingLevel}</p>
          <p>Primary Focus: {coachingTips.primaryFocus}</p>

          <h4>Immediate Actions:</h4>
          <ul>
            {coachingTips.immediateActions?.map((action, index) => (
              <li key={index}>
                <strong>{action.action}</strong>: {action.example} (<em>{action.improvement}</em>)
              </li>
            ))}
          </ul>

          <h4>Strategic Tips:</h4>
          <ul>
            {coachingTips.strategicTips?.map((tip, index) => (
              <li key={index}>
                <strong>{tip.strategy}</strong>: {tip.application} (<em>{tip.benefit}</em>)
              </li>
            ))}
          </ul>

          <h4>Practice Exercises:</h4>
          <ul>
            {coachingTips.practiceExercises?.map((exercise, index) => (
              <li key={index}>
                <strong>{exercise.exercise}</strong> (Duration: {exercise.duration}): {exercise.outcome}
              </li>
            ))}
          </ul>

          <h4>Motivational Message:</h4>
          <p>{coachingTips.motivationalMessage}</p>

          <h4>Next Session Focus:</h4>
          <p>Focus: {coachingTips.nextSession?.focus}</p>
          <p>Goal: {coachingTips.nextSession?.goal}</p>
          <p>Success Indicator: {coachingTips.nextSession?.success_indicator}</p>
        </div>
      )}
    </div>
  );
};