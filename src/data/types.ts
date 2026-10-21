export interface Skill {
  name: string;
  category: 'core' | 'programmatic' | 'architectural' | 'tooling';
  importance: 'Essential' | 'High' | 'Advanced';
  description: string;
  practicalApplication: string;
}

export interface UseCase {
  title: string;
  problemSolved: string;
  howRustSolvesIt: string;
  realWorldExample: string;
  cratesAndEcosystem: string[];
}

export interface IndustryComparison {
  traditionalTech: string;
  traditionalPainPoints: string[];
  rustParadigmShift: string[];
  metricsImprovement: string;
}

export interface IndustryTrack {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  category: string;
  color: string;
  badge: string;
  scopeOfWork: string[];
  dayInTheLife: string;
  roleTitles: string[];
  keyChallenges: string[];
  comparison: IndustryComparison;
  coreConcepts: string[];
  programmaticSkills: Skill[];
  mustKnowCrates: { name: string; purpose: string; link?: string }[];
  useCases: UseCase[];
  capstoneProjects: {
    level: 'Beginner' | 'Intermediate' | 'Staff/Principal';
    title: string;
    description: string;
    deliverables: string[];
  }[];
  interviewQuestions: {
    question: string;
    whatInterviewersLookFor: string;
  }[];
}

export interface CoreStage {
  stage: number;
  title: string;
  duration: string;
  objectives: string;
  topics: {
    title: string;
    description: string;
    codeSnippet?: string;
  }[];
  handsOnDrills: string[];
}
