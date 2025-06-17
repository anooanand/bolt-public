import React, { useState } from 'react';
import { useLearning } from '../contexts/LearningContext';
import { BookOpen, Clock, Trophy, Star, CheckCircle, Lock, Play, Users, Target, Award } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  points: number;
  prerequisites?: string[];
  isCompleted: boolean;
  isLocked: boolean;
}

const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'NSW Selective Assessment Criteria',
    description: 'Understanding the marking criteria and what examiners look for in your essays.',
    duration: '15 min',
    difficulty: 'Beginner',
    category: 'Foundations',
    points: 50,
    isCompleted: true,
    isLocked: false
  },
  {
    id: 'lesson-2',
    title: 'Sentence Structure Mastery',
    description: 'Learn to craft varied and sophisticated sentence structures that impress examiners.',
    duration: '20 min',
    difficulty: 'Beginner',
    category: 'Grammar & Style',
    points: 75,
    isCompleted: true,
    isLocked: false
  },
  {
    id: 'lesson-3',
    title: 'Paragraph Building Techniques',
    description: 'Master the art of constructing coherent, well-developed paragraphs.',
    duration: '25 min',
    difficulty: 'Beginner',
    category: 'Structure',
    points: 100,
    isCompleted: false,
    isLocked: false
  },
  {
    id: 'lesson-4',
    title: 'Advanced Punctuation',
    description: 'Use punctuation strategically to enhance your writing style and clarity.',
    duration: '18 min',
    difficulty: 'Intermediate',
    category: 'Grammar & Style',
    points: 85,
    prerequisites: ['lesson-2'],
    isCompleted: false,
    isLocked: false
  },
  {
    id: 'lesson-5',
    title: 'Descriptive Language Techniques',
    description: 'Create vivid imagery and engage readers with powerful descriptive writing.',
    duration: '30 min',
    difficulty: 'Intermediate',
    category: 'Creative Writing',
    points: 120,
    prerequisites: ['lesson-3'],
    isCompleted: false,
    isLocked: false
  },
  {
    id: 'lesson-6',
    title: 'Narrative Structure & Plot',
    description: 'Learn to structure compelling narratives with strong plot development.',
    duration: '35 min',
    difficulty: 'Intermediate',
    category: 'Creative Writing',
    points: 150,
    prerequisites: ['lesson-3', 'lesson-5'],
    isCompleted: false,
    isLocked: false
  },
  {
    id: 'lesson-7',
    title: 'Character Development',
    description: 'Create memorable, three-dimensional characters that drive your narrative.',
    duration: '28 min',
    difficulty: 'Intermediate',
    category: 'Creative Writing',
    points: 130,
    prerequisites: ['lesson-6'],
    isCompleted: false,
    isLocked: true
  },
  {
    id: 'lesson-8',
    title: 'Persuasive Writing Fundamentals',
    description: 'Master the basics of persuasive writing and argumentation.',
    duration: '25 min',
    difficulty: 'Intermediate',
    category: 'Persuasive Writing',
    points: 110,
    prerequisites: ['lesson-3'],
    isCompleted: false,
    isLocked: true
  }
];

const categories = [
  { name: 'All', icon: BookOpen, color: 'text-blue-600' },
  { name: 'Foundations', icon: Target, color: 'text-green-600' },
  { name: 'Grammar & Style', icon: Star, color: 'text-purple-600' },
  { name: 'Structure', icon: Trophy, color: 'text-orange-600' },
  { name: 'Creative Writing', icon: Users, color: 'text-pink-600' },
  { name: 'Persuasive Writing', icon: Award, color: 'text-red-600' }
];

export function EnhancedLearningPlan() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const { progress, startLesson } = useLearning();

  const filteredLessons = selectedCategory === 'All' 
    ? mockLessons 
    : mockLessons.filter(lesson => lesson.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (!lesson.isLocked) {
      startLesson(lesson.id);
      setSelectedLesson(lesson);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${category.color}`} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Lessons Completed</p>
              <p className="text-2xl font-bold">{progress.completedLessons.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Current Streak</p>
              <p className="text-2xl font-bold">{progress.currentStreak} days</p>
            </div>
            <Trophy className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Points</p>
              <p className="text-2xl font-bold">{progress.totalPoints}</p>
            </div>
            <Star className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Time Spent</p>
              <p className="text-2xl font-bold">{Math.floor(progress.totalTimeSpent / 60)}h</p>
            </div>
            <Clock className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory === 'All' ? 'All Lessons' : `${selectedCategory} Lessons`}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`relative bg-white border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                lesson.isCompleted
                  ? 'border-green-200 bg-green-50'
                  : lesson.isLocked
                  ? 'border-gray-200 bg-gray-50 opacity-60'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Status Icons */}
              <div className="absolute top-4 right-4">
                {lesson.isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : lesson.isLocked ? (
                  <Lock className="w-6 h-6 text-gray-400" />
                ) : null}
              </div>

              {/* Lesson Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 pr-8">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{lesson.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{lesson.points} pts</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {lesson.category}
                  </span>
                </div>

                {/* Prerequisites */}
                {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Prerequisites:</span>
                    <div className="mt-1">
                      {lesson.prerequisites.map((prereq) => {
                        const prereqLesson = mockLessons.find(l => l.id === prereq);
                        return (
                          <span key={prereq} className="inline-block bg-gray-100 px-2 py-1 rounded mr-1 mb-1">
                            {prereqLesson?.title || prereq}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleStartLesson(lesson)}
                  disabled={lesson.isLocked}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                    lesson.isCompleted
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : lesson.isLocked
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {lesson.isCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Review Lesson</span>
                    </>
                  ) : lesson.isLocked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Locked</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start Lesson</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {mockLessons.slice(0, 6).map((lesson, index) => (
              <div key={lesson.id} className="relative flex items-center space-x-4">
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  lesson.isCompleted
                    ? 'bg-green-600 text-white'
                    : lesson.isLocked
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-blue-600 text-white'
                }`}>
                  {lesson.isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : lesson.isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <p className="text-sm text-gray-500">{lesson.duration} • {lesson.points} points</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}