"""
Enhanced AI Operations Service
Provides sophisticated backend integration for the writing assistant
"""

import json
import re
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime
import openai
import os

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')
openai.api_base = os.getenv('OPENAI_API_BASE', 'https://api.openai.com/v1')

@dataclass
class TextPosition:
    start: int
    end: int

@dataclass
class HighlightRange:
    start: int
    end: int
    type: str
    message: str
    suggestions: List[str]
    category: Optional[str] = None
    severity: Optional[str] = None
    context: Optional[str] = None

@dataclass
class ContextSummary:
    writing_type: str
    current_stage: str
    word_count: int
    key_topics: List[str]
    student_level: str
    progress_notes: List[str]
    last_feedback_type: str

class EnhancedAIOperationsService:
    """Enhanced AI service with sophisticated natural language processing"""
    
    def __init__(self):
        self.model = "gpt-4"
        self.max_tokens = 2000
        
    async def analyze_question(self, question: str, text_type: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze a question and provide structured guidance"""
        
        prompt = f"""
        You are an expert writing coach. A student has asked: "{question}"
        
        Context:
        - Writing type: {text_type}
        - Current stage: {context.get('currentStage', 'initial')}
        - Word count: {context.get('wordCount', 0)}
        - Student level: {context.get('studentLevel', 'intermediate')}
        
        Provide a structured response with:
        1. Direct guidance addressing their question
        2. Specific writing strategies for {text_type} writing
        3. Suggested structure or next steps
        4. Encouraging feedback
        
        Format your response as JSON with keys: guidance, strategies, structure, encouragement
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful writing coach who provides structured, encouraging guidance."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            
            # Try to parse as JSON, fallback to structured text
            try:
                result = json.loads(content)
            except json.JSONDecodeError:
                result = {
                    "guidance": content,
                    "strategies": [],
                    "structure": "",
                    "encouragement": "Keep up the great work!"
                }
            
            return result
            
        except Exception as e:
            print(f"Error in analyze_question: {e}")
            return {
                "guidance": "I'd be happy to help! Could you tell me more about what specific aspect you'd like guidance on?",
                "strategies": [],
                "structure": "",
                "encouragement": "I'm here to support your writing journey!"
            }
    
    async def check_grammar_for_editor(self, text: str, include_positions: bool = True) -> Dict[str, Any]:
        """Advanced grammar checking with character positions for editor highlighting"""
        
        if not text.strip() or len(text) < 10:
            return {"errors": [], "corrections": [], "suggestions": []}
        
        prompt = f"""
        Analyze this text for grammar, spelling, and style issues. For each issue found, provide:
        1. The exact text that needs correction
        2. The suggested correction
        3. A brief explanation
        4. The character position (start and end) in the original text
        5. The type of error (grammar, spelling, style, punctuation)
        6. Severity level (low, medium, high)
        
        Text to analyze: "{text}"
        
        Return a JSON object with an "errors" array. Each error should have:
        - original: the text that needs correction
        - suggestion: the suggested replacement
        - explanation: brief explanation of the issue
        - start: character position where the error starts
        - end: character position where the error ends
        - type: error type (grammar/spelling/style/punctuation)
        - severity: severity level (low/medium/high)
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an expert grammar and style checker. Provide precise character positions for each issue."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=0.3
            )
            
            content = response.choices[0].message.content
            
            try:
                result = json.loads(content)
                
                # Validate and fix positions if needed
                if include_positions and "errors" in result:
                    result["errors"] = self._validate_positions(result["errors"], text)
                
                return result
                
            except json.JSONDecodeError:
                # Fallback to rule-based checking
                return self._fallback_grammar_check(text)
                
        except Exception as e:
            print(f"Error in check_grammar_for_editor: {e}")
            return self._fallback_grammar_check(text)
    
    async def enhance_vocabulary(self, text: str, level: str = "intermediate") -> Dict[str, Any]:
        """Suggest vocabulary enhancements with positions"""
        
        prompt = f"""
        Analyze this text and suggest vocabulary enhancements appropriate for a {level} level student.
        For each suggestion, provide:
        1. The original word/phrase
        2. A stronger alternative
        3. Character positions in the text
        4. Brief explanation of why the suggestion is better
        
        Text: "{text}"
        
        Return JSON with "enhancements" array containing:
        - original: the word/phrase to replace
        - suggestion: the enhanced alternative
        - start: character position start
        - end: character position end
        - explanation: why this is better
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": f"You are a vocabulary coach helping {level} level students improve their word choice."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            
            try:
                result = json.loads(content)
                
                # Validate positions
                if "enhancements" in result:
                    result["enhancements"] = self._validate_positions(result["enhancements"], text)
                
                return result
                
            except json.JSONDecodeError:
                return {"enhancements": []}
                
        except Exception as e:
            print(f"Error in enhance_vocabulary: {e}")
            return {"enhancements": []}
    
    async def analyze_structure(self, text: str, text_type: str, stage: str) -> Dict[str, Any]:
        """Analyze text structure and provide feedback"""
        
        prompt = f"""
        Analyze the structure of this {text_type} writing at the {stage} stage.
        
        Text: "{text}"
        
        Provide feedback on:
        1. Overall structure and organization
        2. Paragraph development
        3. Transitions between ideas
        4. Introduction and conclusion (if present)
        5. Specific suggestions for improvement
        
        Return JSON with keys: structure_score, feedback, suggestions, strengths, areas_for_improvement
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": f"You are an expert in {text_type} writing structure and organization."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            
            try:
                result = json.loads(content)
                return result
            except json.JSONDecodeError:
                return {
                    "structure_score": 7,
                    "feedback": content,
                    "suggestions": [],
                    "strengths": [],
                    "areas_for_improvement": []
                }
                
        except Exception as e:
            print(f"Error in analyze_structure: {e}")
            return {
                "structure_score": 7,
                "feedback": "Your writing shows good organization. Keep developing your ideas with clear examples and smooth transitions.",
                "suggestions": ["Add more specific examples", "Improve transitions between paragraphs"],
                "strengths": ["Clear main ideas"],
                "areas_for_improvement": ["Paragraph development"]
            }
    
    async def get_nsw_selective_feedback(self, content: str, text_type: str, assistance_level: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Provide comprehensive NSW Selective-style feedback with highlighting positions"""
        
        word_count = len(content.split())
        
        prompt = f"""
        Provide comprehensive feedback for this {text_type} writing ({word_count} words) at {assistance_level} level.
        
        Text: "{content}"
        
        Context:
        - Writing stage: {context.get('currentStage', 'writing')}
        - Student level: {context.get('studentLevel', 'intermediate')}
        - Previous feedback: {context.get('lastFeedbackType', 'none')}
        
        Provide feedback in these categories:
        1. Strengths (what's working well) - include specific examples from text with positions
        2. Areas for improvement - include specific examples with positions
        3. Vocabulary suggestions - with positions
        4. Grammar/spelling corrections - with positions
        5. Overall score and criteria scores (ideas, structure, language, accuracy)
        
        For each feedback item that references specific text, include:
        - exampleFromText: the exact text being referenced
        - position: {start: number, end: number} character positions
        - suggestionForImprovement: specific suggestion if applicable
        
        Return comprehensive JSON with feedbackItems, corrections, vocabularyEnhancements, overallScore, criteriaScores
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an expert NSW Selective writing assessor providing detailed, constructive feedback."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=0.7
            )
            
            content_response = response.choices[0].message.content
            
            try:
                result = json.loads(content_response)
                
                # Validate and fix positions for all feedback items
                if "feedbackItems" in result:
                    for item in result["feedbackItems"]:
                        if "exampleFromText" in item and "position" not in item:
                            # Find position if not provided
                            example = item["exampleFromText"]
                            start_pos = content.find(example)
                            if start_pos != -1:
                                item["position"] = {
                                    "start": start_pos,
                                    "end": start_pos + len(example)
                                }
                
                if "corrections" in result:
                    for correction in result["corrections"]:
                        if "original" in correction and "position" not in correction:
                            original = correction["original"]
                            start_pos = content.find(original)
                            if start_pos != -1:
                                correction["position"] = {
                                    "start": start_pos,
                                    "end": start_pos + len(original)
                                }
                
                if "vocabularyEnhancements" in result:
                    for enhancement in result["vocabularyEnhancements"]:
                        if "original" in enhancement and "position" not in enhancement:
                            original = enhancement["original"]
                            start_pos = content.find(original)
                            if start_pos != -1:
                                enhancement["position"] = {
                                    "start": start_pos,
                                    "end": start_pos + len(original)
                                }
                
                return result
                
            except json.JSONDecodeError:
                # Fallback response
                return self._create_fallback_feedback(content, word_count)
                
        except Exception as e:
            print(f"Error in get_nsw_selective_feedback: {e}")
            return self._create_fallback_feedback(content, word_count)
    
    def _validate_positions(self, items: List[Dict], text: str) -> List[Dict]:
        """Validate and fix character positions in feedback items"""
        validated_items = []
        
        for item in items:
            if "original" in item:
                search_text = item["original"]
            elif "exampleFromText" in item:
                search_text = item["exampleFromText"]
            else:
                validated_items.append(item)
                continue
            
            # Find the position in text
            start_pos = text.find(search_text)
            if start_pos != -1:
                item["start"] = start_pos
                item["end"] = start_pos + len(search_text)
                validated_items.append(item)
            elif "start" in item and "end" in item:
                # Keep existing positions if text not found but positions exist
                validated_items.append(item)
        
        return validated_items
    
    def _fallback_grammar_check(self, text: str) -> Dict[str, Any]:
        """Rule-based grammar checking fallback"""
        errors = []
        
        # Common grammar patterns
        patterns = [
            (r'\b(their|there|they\'re)\b', 'Check their/there/they\'re usage'),
            (r'\b(your|you\'re)\b', 'Check your/you\'re usage'),
            (r'\b(its|it\'s)\b', 'Check its/it\'s usage'),
            (r'\bcould of\b', 'Use "could have" instead of "could of"'),
            (r'\bshould of\b', 'Use "should have" instead of "should of"'),
            (r'  +', 'Multiple spaces found'),
        ]
        
        for pattern, message in patterns:
            for match in re.finditer(pattern, text, re.IGNORECASE):
                errors.append({
                    "original": match.group(),
                    "suggestion": "Check usage",
                    "explanation": message,
                    "start": match.start(),
                    "end": match.end(),
                    "type": "grammar",
                    "severity": "medium"
                })
        
        return {"errors": errors}
    
    def _create_fallback_feedback(self, content: str, word_count: int) -> Dict[str, Any]:
        """Create fallback feedback when AI service fails"""
        return {
            "feedbackItems": [
                {
                    "type": "praise",
                    "text": f"Great work on your {word_count}-word piece! You're making good progress.",
                    "area": "Overall Progress"
                },
                {
                    "type": "suggestion",
                    "text": "Consider adding more specific details to strengthen your writing.",
                    "area": "Content Development"
                }
            ],
            "corrections": [],
            "vocabularyEnhancements": [],
            "overallScore": 7,
            "criteriaScores": {
                "ideas": 7,
                "structure": 7,
                "language": 7,
                "accuracy": 8
            },
            "strengths": ["Clear communication", "Good effort"],
            "areasForImprovement": ["Add more detail", "Vary sentence structure"]
        }

# Flask application integration
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

ai_service = EnhancedAIOperationsService()

@app.route('/ai-operations', methods=['POST'])
async def handle_ai_operations():
    """Main endpoint for AI operations"""
    try:
        data = request.get_json()
        action = data.get('action')
        
        if action == 'analyzeQuestion':
            result = await ai_service.analyze_question(
                data.get('question', ''),
                data.get('textType', 'narrative'),
                data.get('context', {})
            )
            
        elif action == 'checkGrammarForEditor':
            result = await ai_service.check_grammar_for_editor(
                data.get('text', ''),
                data.get('includePositions', True)
            )
            
        elif action == 'enhanceVocabulary':
            result = await ai_service.enhance_vocabulary(
                data.get('text', ''),
                data.get('level', 'intermediate')
            )
            
        elif action == 'analyzeStructure':
            result = await ai_service.analyze_structure(
                data.get('text', ''),
                data.get('textType', 'narrative'),
                data.get('stage', 'writing')
            )
            
        elif action == 'getNSWSelectiveFeedback':
            result = await ai_service.get_nsw_selective_feedback(
                data.get('content', ''),
                data.get('textType', 'narrative'),
                data.get('assistanceLevel', 'detailed'),
                data.get('context', {})
            )
            
        else:
            return jsonify({"error": "Unknown action"}), 400
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in handle_ai_operations: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)