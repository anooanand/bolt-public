import React, { useState } from 'react';

export const AdaptiveAI: React.FC = () => {
  const [step, setStep] = useState(1);

  const stepsContent = [
    {
      title: "Step 1: Write Your Essay",
      description: "Start by writing your essay on any given topic. Our platform supports various essay types relevant to the NSW Selective Exam.",
      image: "https://via.placeholder.com/600x400?text=Write+Essay", // Placeholder image
      alt: "Write Essay"
    },
    {
      title: "Step 2: Receive Instant Feedback",
      description: "Our AI provides immediate, detailed feedback on grammar, vocabulary, structure, and coherence, tailored to your current skill level.",
      image: "https://via.placeholder.com/600x400?text=Instant+Feedback", // Placeholder image
      alt: "Instant Feedback"
    },
    {
      title: "Step 3: Get Personalized Guidance",
      description: "Based on your performance, the AI offers personalized suggestions and exercises to help you improve specific areas.",
      image: "https://via.placeholder.com/600x400?text=Personalized+Guidance", // Placeholder image
      alt: "Personalized Guidance"
    },
    {
      title: "Step 4: Track Your Progress",
      description: "Monitor your improvement over time with detailed analytics and progress reports, helping you stay motivated and focused.",
      image: "https://via.placeholder.com/600x400?text=Track+Progress", // Placeholder image
      alt: "Track Progress"
    },
  ];

  const handleNext = ( ) => {
    setStep((prevStep) => (prevStep % stepsContent.length) + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => (prevStep - 2 + stepsContent.length) % stepsContent.length + 1);
  };

  const currentStepContent = stepsContent[step - 1];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Our AI writing coach simplifies your NSW Selective Exam preparation into easy, effective steps.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentStepContent.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                {currentStepContent.description}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={currentStepContent.image}
                alt={currentStepContent.alt}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Adaptive AI?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI is designed to provide a truly personalized learning experience, ensuring every student receives the right support at the right time. This leads to faster progress and greater confidence in tackling the NSW Selective Exam.
          </p>
        </div>
      </div>
    </section>
  );
};
