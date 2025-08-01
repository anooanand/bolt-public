export function checkNSWCurriculumAlignment(content: string): string[] {
  const alignmentIssues: string[] = [];
  const lowerContent = content.toLowerCase();

  // Example keywords/themes for NSW curriculum alignment
  const nswKeywords = [
    "narrative techniques",
    "persuasive devices",
    "descriptive language",
    "text structure",
    "audience and purpose",
    "literary devices",
    "argument development",
    "evidence-based writing",
    "critical analysis",
    "creative writing conventions"
  ];

  const foundKeywords: string[] = [];
  nswKeywords.forEach(keyword => {
    if (lowerContent.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  });

  if (foundKeywords.length === 0) {
    alignmentIssues.push("No explicit NSW curriculum keywords or themes found. Consider incorporating more specific terminology related to syllabus outcomes.");
  } else {
    alignmentIssues.push(`Content shows alignment with the following NSW curriculum themes: ${foundKeywords.join(", ")}.`);
  }

  return alignmentIssues;
}
