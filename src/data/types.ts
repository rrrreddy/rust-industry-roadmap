export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';

export interface RoadmapStep {
  id: string;
  level: SkillLevel;
  title: string;
  eli5: string; // "Explain Like I'm 5" - simple plain-English breakdown
  whyItMatters: string;
  conceptsToMaster: string[];
  codeExample: {
    title: string;
    description: string;
    code: string;
  };
  exercise: {
    task: string;
    hint: string;
  };
  estimatedHours: string;
}

export interface IndustryUseCase {
  title: string;
  eli5Summary: string;
  theOldWay: string; // How it used to be done and why it broke
  theRustWay: string; // How Rust revolutionized it
  realWorldProjects: string[];
  keyCrates: { name: string; purpose: string; url: string }[];
}

export interface IndustryTrack {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  color: string;
  accentColor: string;
  eli5Introduction: string; // Plain English for complete beginners
  whatYouWillBuild: string[];
  averageSalaryOrDemand: string;
  prerequisites: string[];
  roadmapSteps: RoadmapStep[];
  useCases: IndustryUseCase[];
  firstProjectGuide: {
    title: string;
    description: string;
    steps: string[];
  };
}

export interface RustBasicsStep {
  id: string;
  module: number;
  title: string;
  subtitle: string;
  analogy: string;
  explanation: string;
  codeSnippet: string;
  commonPitfalls: string[];
  handsOnTask: string;
}

export interface GlossaryItem {
  term: string;
  pronunciation?: string;
  eli5: string;
  technicalDefinition: string;
  relatedIndustry: string;
}
