import React from 'react';

export function SupportTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Extra Help & Resources</h3>
      
      <div className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-4">
            Need additional support with basic punctuation? Here are some helpful resources and tips!
          </p>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Video Tutorials</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Essential Punctuation Rules Explained</a>
                  <p className="text-sm text-gray-600">A comprehensive guide to using periods, commas, question marks, and more.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Comma Rules Made Simple</a>
                  <p className="text-sm text-gray-600">Learn when and how to use commas correctly in your writing.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Quotation Marks and Dialogue: Getting It Right</a>
                  <p className="text-sm text-gray-600">How to properly punctuate dialogue and quotations in your writing.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Downloadable Resources</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Punctuation Quick Reference Guide</a>
                  <p className="text-sm text-gray-600">A printable cheat sheet with all essential punctuation rules.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Punctuation Practice Worksheet</a>
                  <p className="text-sm text-gray-600">Exercises to help you master correct punctuation usage.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Common Punctuation Errors and How to Fix Them</a>
                  <p className="text-sm text-gray-600">A guide to identifying and correcting the most common punctuation mistakes.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Frequently Asked Questions</h4>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-1">When should I use a semicolon instead of a comma?</h5>
                <p className="text-gray-700">
                  Use a semicolon to join two independent clauses (complete sentences) that are closely related in meaning but not joined by a coordinating conjunction (and, but, or, etc.). For example: "The exam was challenging; I studied for hours." You can also use semicolons to separate items in a list when the items themselves contain commas.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How do I use commas with coordinating conjunctions?</h5>
                <p className="text-gray-700">
                  When joining two independent clauses with a coordinating conjunction (FANBOYS: for, and, nor, but, or, yet, so), place a comma before the conjunction. For example: "I studied hard for the exam, and I felt confident when taking it." However, if both clauses are very short, the comma is sometimes omitted.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">When do I use quotation marks?</h5>
                <p className="text-gray-700">
                  Use quotation marks to enclose direct speech or quotations, titles of short works (articles, short stories, poems), and words used in a special way. Remember that punctuation usually goes inside the quotation marks in Australian English. For example: "I'll be there soon," she said.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How do I use apostrophes correctly?</h5>
                <p className="text-gray-700">
                  Use apostrophes for contractions (don't, can't, it's) and to show possession (Sarah's book, the students' desks). Remember that "it's" (with an apostrophe) means "it is" or "it has," while "its" (without an apostrophe) is the possessive form of "it."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Need more help?</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  If you're still struggling with punctuation, try reading your writing aloud. Often, natural pauses in speech indicate where commas or periods should go. Also, consider having someone else proofread your work specifically for punctuation errors, as these can be easy to miss in your own writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
