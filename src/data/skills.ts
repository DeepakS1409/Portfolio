import { SkillCategory, SkillItem } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Programming Languages',
  'Web Development',
  'AI & Machine Learning',
  'Tools & Platforms',
  'Hardware & Emerging Technologies (Interests)'
];

export const SKILLS_DATA: SkillItem[] = [
  // Programming Languages
  {
    name: 'C',
    icon: 'Terminal',
    level: 'Core Language',
    description: 'Foundational programming in college coursework, covering memory management, pointers, and algorithmic structures.',
    category: 'Programming Languages',
    highlightTag: 'System Fundamentals'
  },
  {
    name: 'C++',
    icon: 'Cpu',
    level: 'Core Language',
    description: 'Object-Oriented Programming (OOP), standard template library, and problem-solving practice.',
    category: 'Programming Languages',
    highlightTag: 'OOP & DSA'
  },
  {
    name: 'Python',
    icon: 'FileCode',
    level: 'Applied Language',
    description: 'Scripting, backend logic, data manipulation, automation, and AI integration experiments.',
    category: 'Programming Languages',
    highlightTag: 'AI & Scripting'
  },
  {
    name: 'JavaScript',
    icon: 'Braces',
    level: 'Core Web Language',
    description: 'ES6+ modern syntax, asynchronous programming, DOM manipulation, and interactive web application logic.',
    category: 'Programming Languages',
    highlightTag: 'Modern Web'
  },

  // Web Development
  {
    name: 'HTML5',
    icon: 'Globe',
    level: 'Semantic Markup',
    description: 'Accessible, clean, and semantic page structures following modern web guidelines.',
    category: 'Web Development'
  },
  {
    name: 'CSS3',
    icon: 'Palette',
    level: 'Modern Styling',
    description: 'Flexbox, Grid, custom responsive layouts, keyframe animations, and glassmorphism styling.',
    category: 'Web Development'
  },
  {
    name: 'React',
    icon: 'Layers',
    level: 'Component Framework',
    description: 'Declarative component design, hooks architecture (useState, useEffect, useMemo), and modular state.',
    category: 'Web Development',
    highlightTag: 'Modern Frontend'
  },
  {
    name: 'Vite',
    icon: 'Zap',
    level: 'Build Tooling',
    description: 'Rapid developer server setup, lightning-fast HMR, and optimized production bundling.',
    category: 'Web Development'
  },
  {
    name: 'Responsive Web Design',
    icon: 'Smartphone',
    level: 'Design Principle',
    description: 'Mobile-first styling, adaptive breakpoints, and touch-optimized interfaces.',
    category: 'Web Development'
  },
  {
    name: 'Frontend Development',
    icon: 'Monitor',
    level: 'Core Discipline',
    description: 'Building interactive user experiences, seamless micro-interactions, and visual dashboards.',
    category: 'Web Development'
  },
  {
    name: 'Full-Stack Development (Learning)',
    icon: 'Server',
    level: 'Currently Learning',
    description: 'Exploring backend services, API routing, database connectivity, and full-stack architecture.',
    category: 'Web Development',
    highlightTag: 'Active Goal'
  },

  // AI & Machine Learning
  {
    name: 'Generative AI',
    icon: 'Sparkles',
    level: 'Applied Exploration',
    description: 'Integrating LLM capabilities into real-world applications to boost productivity and automate tasks.',
    category: 'AI & Machine Learning',
    highlightTag: 'Innovation'
  },
  {
    name: 'AI Integration',
    icon: 'Bot',
    level: 'Practical Application',
    description: 'Connecting external AI services and models via APIs to create intelligent web systems.',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Prompt Engineering',
    icon: 'MessageSquareCode',
    level: 'Technique',
    description: 'Structuring structured, few-shot, and role-conditioned prompts for consistent machine outputs.',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Machine Learning Fundamentals',
    icon: 'TrendingUp',
    level: 'Conceptual Knowledge',
    description: 'Understanding supervised vs unsupervised learning, regression, classification, and evaluation metrics.',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Computer Vision Concepts',
    icon: 'Eye',
    level: 'Conceptual Knowledge',
    description: 'Exploring image classification, feature extraction, and camera stream processing principles.',
    category: 'AI & Machine Learning'
  },
  {
    name: 'AI-Powered Application Development',
    icon: 'BrainCircuit',
    level: 'Project Practice',
    description: 'Combining frontend user interfaces with AI backend services to build smart assistants like Padika AI.',
    category: 'AI & Machine Learning',
    highlightTag: 'Core Passion'
  },

  // Tools & Platforms
  {
    name: 'Git',
    icon: 'GitBranch',
    level: 'Version Control',
    description: 'Branching, committing, merge resolution, and collaborative code workflows.',
    category: 'Tools & Platforms'
  },
  {
    name: 'GitHub',
    icon: 'Github',
    level: 'Code Hosting',
    description: 'Repository management, open-source exploration, and project documentation.',
    category: 'Tools & Platforms'
  },
  {
    name: 'VS Code',
    icon: 'Code2',
    level: 'Primary IDE',
    description: 'Configured development environment with linting, debugging, and terminal workflows.',
    category: 'Tools & Platforms'
  },
  {
    name: 'Antigravity',
    icon: 'Orbit',
    level: 'AI IDE & Agent Platform',
    description: 'Advanced agentic pair-programming workflows, multi-file transformations, and AI-accelerated delivery.',
    category: 'Tools & Platforms',
    highlightTag: 'Cutting-Edge'
  },
  {
    name: 'Streamlit',
    icon: 'LayoutGrid',
    level: 'Rapid Prototyping',
    description: 'Quickly building interactive Python web applications for data science and AI models.',
    category: 'Tools & Platforms'
  },
  {
    name: 'Vercel',
    icon: 'Cloud',
    level: 'Deployment Platform',
    description: 'Continuous deployment of frontend React & Vite projects with edge routing.',
    category: 'Tools & Platforms'
  },

  // Hardware & Emerging Technologies — INTERESTS
  {
    name: 'Arduino',
    icon: 'CircuitBoard',
    level: 'Exploring Interest',
    description: 'Exploring microcontroller programming, digital/analog I/O pins, and basic sensor interfacing.',
    category: 'Hardware & Emerging Technologies (Interests)',
    isInterestOnly: true,
    highlightTag: 'Future Focus'
  },
  {
    name: 'ESP32',
    icon: 'Wifi',
    level: 'Exploring Interest',
    description: 'Investigating Wi-Fi and Bluetooth enabled microcontrollers for IoT node communication.',
    category: 'Hardware & Emerging Technologies (Interests)',
    isInterestOnly: true,
    highlightTag: 'Future Focus'
  },
  {
    name: 'Internet of Things (IoT)',
    icon: 'Radio',
    level: 'Exploring Interest',
    description: 'Fascinated by connected sensor networks, smart urban infrastructure, and edge data collection.',
    category: 'Hardware & Emerging Technologies (Interests)',
    isInterestOnly: true,
    highlightTag: 'Future Focus'
  },
  {
    name: 'Embedded Systems',
    icon: 'Microchip',
    level: 'Exploring Interest',
    description: 'Studying the bridge between low-level firmware execution and physical electronic hardware.',
    category: 'Hardware & Emerging Technologies (Interests)',
    isInterestOnly: true,
    highlightTag: 'Future Focus'
  },
  {
    name: 'Robotics',
    icon: 'Bot',
    level: 'Exploring Interest',
    description: 'Passionate about robotic kinematics, servo actuation, and automated cyber-physical systems.',
    category: 'Hardware & Emerging Technologies (Interests)',
    isInterestOnly: true,
    highlightTag: 'Future Focus'
  },
  {
    name: 'Electronics',
    icon: 'Activity',
    level: 'Exploring Interest',
    description: 'Learning circuit schematics, resistors, capacitors, logic gates, and sensor signal reading.',
    category: 'Hardware & Emerging Technologies (Interests)',
    isInterestOnly: true,
    highlightTag: 'Future Focus'
  },
  {
    name: 'Hardware–Software Integration',
    icon: 'Cpu',
    level: 'Core Vision / Interest',
    description: 'The primary career aspiration: unifying elegant software interfaces with physical hardware automation.',
    category: 'Hardware & Emerging Technologies (Interests)',
    isInterestOnly: true,
    highlightTag: 'Core Vision'
  }
];
