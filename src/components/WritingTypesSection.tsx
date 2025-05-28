import React from 'react';

interface WritingTypesProps {
  onSelectType: (type: string) => void;
}

export function WritingTypesSection({ onSelectType }: WritingTypesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">NSW Selective Writing Types</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master all the text types that may appear in the NSW Selective exam with specialized guidance for each.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('narrative')}
          >
            <div className="mb-3 text-indigo-600">
              <i className="fas fa-feather-alt text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Narrative</h3>
            <p className="text-gray-500 text-sm">Creative storytelling with characters and plot</p>
          </div>
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('persuasive')}
          >
            <div className="mb-3 text-blue-600">
              <i className="fas fa-bullhorn text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Persuasive</h3>
            <p className="text-gray-500 text-sm">Convincing arguments with supporting evidence</p>
          </div>
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('news-report')}
          >
            <div className="mb-3 text-emerald-600">
              <i className="fas fa-newspaper text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">News Report</h3>
            <p className="text-gray-500 text-sm">Factual reporting of current events</p>
          </div>
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('diary-entry')}
          >
            <div className="mb-3 text-amber-600">
              <i className="fas fa-book text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Diary Entry</h3>
            <p className="text-gray-500 text-sm">Personal reflections in chronological order</p>
          </div>
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('letter')}
          >
            <div className="mb-3 text-violet-600">
              <i className="fas fa-envelope text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Letter</h3>
            <p className="text-gray-500 text-sm">Formal or informal correspondence</p>
          </div>
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('advertisement')}
          >
            <div className="mb-3 text-rose-600">
              <i className="fas fa-ad text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Advertisement</h3>
            <p className="text-gray-500 text-sm">Promotional content with persuasive language</p>
          </div>
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('discussion')}
          >
            <div className="mb-3 text-cyan-600">
              <i className="fas fa-comments text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Discussion</h3>
            <p className="text-gray-500 text-sm">Balanced examination of different viewpoints</p>
          </div>
          <div 
            className="writing-type-card bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-md"
            onClick={() => onSelectType('guide')}
          >
            <div className="mb-3 text-green-600">
              <i className="fas fa-map-signs text-2xl"></i>
            </div>
            <h3 className="font-semibold mb-2">Guide</h3>
            <p className="text-gray-500 text-sm">Instructional content with helpful advice</p>
          </div>
        </div>
      </div>
    </section>
  );
}
