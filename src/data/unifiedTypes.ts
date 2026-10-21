export type StageLevel = 'Phase 1: Beginner Foundations' | 'Phase 2: Intermediate Practitioner' | 'Phase 3: Advanced Architectures' | 'Phase 4: Staff/Principal Master';

export interface UnifiedSkill {
  id: string;
  phase: StageLevel;
  levelBadge: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  title: string;
  eli5: string; // Plain English for beginners
  whyInThisIndustry: string; // Why this exact skill is needed in this field
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
  estimatedTime: string;
}

export interface UnifiedIndustryTrack {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  badge: string;
  color: string;
  accentColor: string;
  eli5Overview: string;
  whyRustDominates: string;
  legacyFlawsVsRust: {
    legacyFlaw: string;
    rustFix: string;
    measuredImpact: string;
  };
  whatYouWillBuild: string[];
  salaryAndDemand: string;
  beginnerZeroPrerequisites: string[];
  phases: {
    phaseTitle: StageLevel;
    phaseDescription: string;
    skills: UnifiedSkill[];
  }[];
  capstoneProject: {
    title: string;
    level: string;
    description: string;
    stepByStepGuide: string[];
  };
  mustKnowCrates: { name: string; purpose: string; link: string }[];
  interviewPrep: {
    question: string;
    expectedAnswer: string;
  }[];
}
