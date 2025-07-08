import React, { useState, useEffect } from 'react';
import { evaluateEssay } from '../lib/openai';
import { Loader2, ArrowLeft, Award, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EssayFeedbackPageProps {
  content?: string;
  textType?: string;
  onBack?: () => void;
}

interface FeedbackData {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  specificFeedback: {
    structure: string;
    language: string;
    ideas: string;
    mechanics: string;
  };
  nextSteps: string[];
}

export function EssayFeedbackPage({ content = '', textType = 'narrative', onBack }: EssayFeedbackPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample content for demo purposes if no content is provided
  const sampleContent = `The old lighthouse stood sentinel on the jagged cliff edge, its weathered stone exterior bearing the scars of a century's worth of storms. Paint peeled from its once-pristine white surface like old skin, revealing patches of gray stone underneath that seemed to tell stories of bygone eras.

As I approached along the winding cliff path, the salty breeze intensified, carrying with it the rhythmic percussion of waves crashing against the rocks below. Seagulls wheeled overhead, their mournful cries punctuating the constant whisper of wind through the coastal grasses.

The heavy oak door at the lighthouse base groaned in protest as I pushed it open, releasing a waft of cool, musty air that spoke of abandonment and neglect. Dust motes danced in the shaft of sunlight that pierced the gloom, illuminating a narrow spiral staircase that twisted upward.`;

  const effectiveContent = content || sampleContent;
  const effectiveTextType = textType || 'narrative';

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const result = await evaluateEssay(effectiveContent, effectiveTextType);
        if (result) {
          setFeedback(result);
        } else {
          setError('Unable to generate feedback. Please try again.');
        }
      } catch (err) {
        setError('An error occurred while evaluating your essay.');
      } finally {
        setIsLoading(false);
      }
    };

    getFeedback();
  }, [effectiveContent, effectiveTextType]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Evaluating Your Essay</h2>
            <p className="text-gray-600">
              Our AI writing coach is carefully analyzing your work against NSW selective school criteria...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Evaluation Error</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Writing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Writing
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Essay Evaluation Results</h1>
              <div className="flex items-center">
                <Award className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-3xl font-bold text-blue-600">{feedback.overallScore}/10</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-1">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="text-green-700 flex items-start">
                      <span className="mr-2">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-1">
                  {feedback.areasForImprovement.map((area, index) => (
                    <li key={index} className="text-amber-700 flex items-start">
                      <span className="mr-2">•</span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Feedback</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Structure</h3>
                <p className="text-gray-700">{feedback.specificFeedback.structure}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Language Use</h3>
                <p className="text-gray-700">{feedback.specificFeedback.language}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Ideas and Content</h3>
                <p className="text-gray-700">{feedback.specificFeedback.ideas}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Grammar and Mechanics</h3>
                <p className="text-gray-700">{feedback.specificFeedback.mechanics}</p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Next Steps</h3>
              <ul className="space-y-2">
                {feedback.nextSteps.map((step, index) => (
                  <li key={index} className="text-blue-800 flex items-start">
                    <span className="mr-2">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}