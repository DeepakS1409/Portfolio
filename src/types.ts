export type ProjectStatus = 'Prototype' | 'In Development' | 'Concept';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI & Automation' | 'Smart Infrastructure' | 'Mobile Concept';
  status: ProjectStatus;
  description: string;
  features: string[];
  technologies: string[];
  metrics?: string;
  githubUrl?: string; // Editable placeholder
  liveDemoUrl?: string; // Editable placeholder
  accentColor: string;
  iconName: string;
  architectureNotes?: string;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Web Development'
  | 'AI & Machine Learning'
  | 'Tools & Platforms'
  | 'Hardware & Emerging Technologies (Interests)';

export interface SkillItem {
  name: string;
  icon: string;
  level: string;
  description: string;
  category: SkillCategory;
  isInterestOnly?: boolean;
  highlightTag?: string;
}

export interface Milestone {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  type: 'Education' | 'Hackathon' | 'Project' | 'Coding' | 'Milestone';
  description: string;
  tags: string[];
  badgeText?: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

export interface LearningItem {
  id: string;
  topic: string;
  category: string;
  currentFocus: string;
  goal: string;
  progressPercent: number;
  status: 'Active Study' | 'Hands-on Practice' | 'Future Exploration';
  resources: string;
}

// TECH RIDE Journey Destinations
export type JourneyDestinationId =
  | 'HERO'
  | 'ABOUT'
  | 'PROJECTS'
  | 'SKILLS'
  | 'EDUCATION'
  | 'ACHIEVEMENTS'
  | 'HARDWARE'
  | 'CONTACT';

export interface JourneyDestination {
  id: JourneyDestinationId;
  label: string;
  shortLabel: string;
  progress: number; // 0.0 to 1.0 along the road curve
  kmMarker: string; // e.g. "KM 0.5"
  landmark: string; // e.g. "Coconut Grove Junction", "SECE Tech Hub", etc.
  signTitle: string;
  signSubtitle: string;
  direction: 'left' | 'right' | 'straight';
}

export type LabZone = 'CENTRAL_LAB' | 'HARDWARE_BENCH' | 'AI_CORE' | 'PROJECT_HOLOGRAMS';

// Section-Based 3D Journey Architecture
export type SectionId =
  | 'projects'
  | 'skills'
  | 'about'
  | 'education'
  | 'achievements'
  | 'certificates'
  | 'hardware'
  | 'contact';

export interface JourneyStation {
  id: string;
  stationNumber: number;
  progress: number; // 0.0 to 1.0 along the section road
  kmMarker: string; // e.g. "KM 0.8"
  title: string;
  subtitle: string;
  categoryTag?: string;
  content: {
    badge?: string;
    description: string;
    highlights?: string[];
    techStack?: string[];
    visualType?: string;
    githubUrl?: string;
    liveDemoUrl?: string;
    extraNote?: string;
    certificateImage?: string;
    organization?: string;
    issueDate?: string;
    validity?: string;
    verificationUrl?: string;
    downloadUrl?: string;
    credentialId?: string;
  };
}

export interface SectionJourneyConfig {
  id: SectionId;
  name: string;
  roadTitle: string;
  roadSubtitle: string;
  themeColor: string;
  icon: string;
  landmark: string;
  stations: JourneyStation[];
}


