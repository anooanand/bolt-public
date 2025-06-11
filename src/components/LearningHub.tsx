import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock, 
  Star,
  Clock,
  Users,
  Award,
  TrendingUp,
  Target,
  FileText,
  Video
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LearningHubProps {
  onNavigate: (page: string) => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  completed: boolean;
  isPro: boolean;
  topics: string[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'exercise';
  completed: boolean;
  locked: boolean;
}

export const LearningHub: React.FC<LearningHubProps> = ({ onNavigate }) => {
  const { isPaidUser } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({
    coursesCompleted: 2,
    totalLessons: 45,
    completedLessons: 28,
    studyTime: '12h 30m',
    streak: 7
  });

  const courses: Course[] = [
    {
      id: 'essay-fundamentals',
      title: 'Essay Writing Fundamentals',
      description: 'Master the basics of essay structure, thesis development, and argumentation',
      duration: '4 hours',
      lessons: 12,
      difficulty: 'Beginner',
      progress: 100,
      completed: true,
      isPro: false,
      topics: ['Essay Structure', 'Thesis Statements', 'Body Paragraphs', 'Conclusions']
    },
    {
      id: 'creative-writing',
      title: 'Creative Writing Mastery',
      description: 'Develop your creative voice through character development, plot structure, and narrative techniques',
      duration: '6 hours',
      lessons: 18,
      difficulty: 'Intermediate',
      progress: 65,
      completed: false,
      isPro: false,
      topics: ['Character Development', 'Plot Structure', 'Dialogue', 'Setting']
    },
    {
      id: 'nsw-selective-prep',
      title: 'NSW Selective Exam Preparation',
      description: 'Comprehensive preparation for NSW Selective School entrance exams',
      duration: '8 hours',
      lessons: 24,
      difficulty: 'Advanced',
      progress: 30,
      completed: false,
      isPro: true,
      topics: ['Exam Strategy', 'Time Management', 'Writing Techniques', 'Practice Tests']
    },
    {
      id: 'academic-writing',
      title: 'Academic Writing Excellence',
      description: 'Advanced techniques for research papers, citations, and scholarly writing',
      duration: '5 hours',
      lessons: 15,
      difficulty: 'Advanced',
      progress: 0,
      completed: false,
      isPro: true,
      topics: ['Research Methods', 'Citations', 'Academic Style', 'Peer Review']
    }
  ];

  const sampleLessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Essay Structure',
      duration: '15 min',
      type: 'video',
      completed: true,
      locked: false
    },
    {
      id: '2',
      title: 'Crafting Strong Thesis Statements',
      duration: '20 min',
      type: 'text',
      completed: true,
      locked: false
    },
    {
      id: '3',
      title: 'Practice Exercise: Thesis Development',
      duration: '30 min',
      type: 'exercise',
      completed: false,
      locked: false
    },
    {
      id: '4',
      title: 'Advanced Argumentation Techniques',
      duration: '25 min',
      type: 'video',
      completed: false,
      locked: !isPaidUser
    }
  ];

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
    }
  };

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return null;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Header */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
            >
              ← Back to Learning Hub
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {course.progress}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Complete
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Course Lessons
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sampleLessons.map((lesson, index) => {
                  const isLocked = lesson.locked;
                  
                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                        lesson.completed
                          ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900'
                          : isLocked
                          ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 opacity-60'
                          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center mr-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 mr-3">
                          {index + 1}
                        </div>
                        {lesson.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        ) : isLocked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {lesson.title}
                          {isLocked && (
                            <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                              Pro
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {getTypeIcon(lesson.type)}
                          <span className="ml-1 mr-3 capitalize">{lesson.type}</span>
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.duration}
                        </div>
                      </div>
                      
                      {!isLocked && !lesson.completed && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Start
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Learning Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Master writing skills with our comprehensive courses and tutorials
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.coursesCompleted}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.completedLessons}/{userStats.totalLessons}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Lessons</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.studyTime}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Study Time</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.streak}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Day Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  4.8
                </p>
                <p className="text-gray-600 dark:text-gray-400">Avg Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {courses.map((course) => {
            const isLocked = course.isPro && !isPaidUser;
            
            return (
              <div
                key={course.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${
                  isLocked ? 'opacity-75' : 'hover:shadow-md transition-shadow cursor-pointer'
                }`}
                onClick={isLocked ? undefined : () => setSelectedCourse(course.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {course.title}
                        {isLocked && (
                          <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                            Pro
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {course.description}
                      </p>
                    </div>
                    {course.completed && (
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 ml-4" />
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {course.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {topic}
                        </span>
                      ))}
                      {course.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                          +{course.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={isLocked ? () => onNavigate('pricing') : () => setSelectedCourse(course.id)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      isLocked
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800'
                        : course.progress === 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : course.completed
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isLocked
                      ? 'Upgrade to Access'
                      : course.progress === 0
                      ? 'Start Course'
                      : course.completed
                      ? 'Review Course'
                      : 'Continue Learning'
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upgrade Prompt for Free Users */}
        {!isPaidUser && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8 border border-blue-200 dark:border-blue-700">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Unlock All Learning Content
              </h2>
              <p className="text-blue-700 dark:text-blue-300 mb-6">
                Get access to advanced courses, NSW Selective exam prep, and exclusive content with Pro!
              </p>
              <button
                onClick={() => onNavigate('pricing')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

